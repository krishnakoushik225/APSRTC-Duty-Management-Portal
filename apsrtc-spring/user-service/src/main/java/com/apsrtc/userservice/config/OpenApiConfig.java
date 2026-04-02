package com.apsrtc.userservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        String description = """
                APSRTC user-service API.

                Error responses use RFC 7807 (`application/problem+json`) with:
                - `title`, `detail`, `instance`, `status`
                - extension `code` (machine-readable), e.g. VALIDATION_FAILED, PASSWORD_MISMATCH,
                  USER_OPERATION_ERROR, FORBIDDEN, LOGIN_RATE_LIMITED, IDEMPOTENCY_IN_FLIGHT.

                Validation errors include `errors` (field → message). For admin mutating POSTs you may send
                `Idempotency-Key` to safely retry; duplicate in-flight keys return 409 with code IDEMPOTENCY_IN_FLIGHT.
                """;

        return new OpenAPI()
                .info(new Info()
                        .title("APSRTC User Service")
                        .version("1.0")
                        .description(description));
    }
}
