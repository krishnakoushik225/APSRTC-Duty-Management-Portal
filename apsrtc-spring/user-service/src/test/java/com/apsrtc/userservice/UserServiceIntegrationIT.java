package com.apsrtc.userservice;

import com.apsrtc.userservice.dto.LoginRequestDTO;
import com.apsrtc.userservice.dto.UserRequestDTO;
import com.apsrtc.userservice.security.IdempotencyFilter;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integration")
@Testcontainers(disabledWithoutDocker = true)
class UserServiceIntegrationIT {

    private static final String SHARED_IT_PASSWORD = "IntegrationIT#9test";

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(DockerImageName.parse("postgres:16-alpine"))
            .withDatabaseName("apsrtc_it")
            .withUsername("it")
            .withPassword("it");

    @Container
    static GenericContainer<?> redis = new GenericContainer<>(DockerImageName.parse("redis:7-alpine"))
            .withExposedPorts(6379);

    @DynamicPropertySource
    static void registerProps(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", postgres::getJdbcUrl);
        r.add("spring.datasource.username", postgres::getUsername);
        r.add("spring.datasource.password", postgres::getPassword);
        r.add("spring.jpa.hibernate.ddl-auto", () -> "validate");
        r.add("spring.flyway.enabled", () -> "true");
        r.add("spring.data.redis.host", redis::getHost);
        r.add("spring.data.redis.port", () -> redis.getMappedPort(6379));
        r.add("jwt.secret", () -> "my-strong-secret-key-which-is-hard-to-decode");
        r.add("app.security.cors-allowed-origins", () -> "http://localhost:3000");
        r.add("app.security.token-blacklist", () -> "redis");
        r.add("app.security.login-rate-limit.backend", () -> "redis");
        r.add("spring.mail.host", () -> "localhost");
        r.add("spring.mail.port", () -> "3025");
        r.add("spring.mail.username", () -> "it@test");
        r.add("spring.mail.password", () -> "it");
    }

    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    FilterChainProxy filterChainProxy;

    @MockBean
    JavaMailSender javaMailSender;

    private String baseUrl() {
        return "http://localhost:" + port;
    }

    @Test
    void actuatorLivenessPermitted() {
        ResponseEntity<String> res = restTemplate.getForEntity(
                baseUrl() + "/actuator/health/liveness", String.class);
        assertThat(res.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(res.getBody()).containsIgnoringCase("UP");
    }

    @Test
    void loginAndForbidCrossUserDutyAccess() throws Exception {
        registerUser("it-a", "a@it.test", "ADMIN");
        registerUser("it-b", "b@it.test", "ADMIN");

        String tokenA = login("it-a", SHARED_IT_PASSWORD);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(tokenA);
        ResponseEntity<String> res = restTemplate.exchange(
                baseUrl() + "/user/it-b/current-duty",
                org.springframework.http.HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class);
        assertThat(res.getStatusCode().value()).isEqualTo(403);
    }

    @Test
    void securityFilterChainRegistersIdempotencyFilter() {
        boolean found = filterChainProxy.getFilterChains().stream()
                .flatMap(chain -> chain.getFilters().stream())
                .anyMatch(IdempotencyFilter.class::isInstance);
        assertThat(found).as("IdempotencyFilter must be on the chain for Redis-backed idempotency ITs").isTrue();
    }

    @Test
    void adminAddUserIdempotencyReplaysCachedResponse() throws Exception {
        registerUser("admin-idem", "admin-idem@it.test", "ADMIN");
        String adminToken = login("admin-idem", SHARED_IT_PASSWORD);

        UserRequestDTO dto = baseUser("idem-emp-1", "idem-emp@it.test", "EMPLOYEE");
        String body = objectMapper.writeValueAsString(dto);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(adminToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Idempotency-Key", "key-" + dto.getId());

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> first = restTemplate.postForEntity(
                baseUrl() + "/admin/users/add", entity, String.class);
        assertThat(first.getStatusCode().value()).isEqualTo(201);

        ResponseEntity<String> second = restTemplate.postForEntity(
                baseUrl() + "/admin/users/add", entity, String.class);
        assertThat(second.getStatusCode().value()).isEqualTo(201);
        assertThat(second.getBody()).isEqualTo(first.getBody());
    }

    private void registerUser(String id, String email, String category) {
        UserRequestDTO dto = baseUser(id, email, category);
        ResponseEntity<String> res = restTemplate.postForEntity(
                baseUrl() + "/auth/register", dto, String.class);
        assertThat(res.getStatusCode().value()).isEqualTo(201);
    }

    private String login(String id, String password) throws Exception {
        LoginRequestDTO login = new LoginRequestDTO();
        login.setId(id);
        login.setPassword(password);

        ResponseEntity<String> res = restTemplate.postForEntity(
                baseUrl() + "/auth/login", login, String.class);
        assertThat(res.getStatusCode().is2xxSuccessful()).isTrue();
        JsonNode node = objectMapper.readTree(res.getBody());
        return node.path("token").asText();
    }

    private static UserRequestDTO baseUser(String id, String email, String category) {
        UserRequestDTO dto = new UserRequestDTO();
        dto.setId(id);
        dto.setName("IT " + id);
        dto.setEmail(email);
        dto.setContactNumber(String.valueOf(6_000_000_000L + (Math.abs(id.hashCode()) % 3_000_000_000L)));
        dto.setCategory(category);
        dto.setDistrict("TestDist");
        dto.setDepo("TestDepo");
        dto.setPassword(SHARED_IT_PASSWORD);
        return dto;
    }
}
