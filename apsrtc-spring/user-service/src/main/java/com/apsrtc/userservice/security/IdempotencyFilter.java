package com.apsrtc.userservice.security;

import com.apsrtc.userservice.util.TokenFingerprint;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;
import org.springframework.web.util.UrlPathHelper;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class IdempotencyFilter extends OncePerRequestFilter {

    private static final List<String> PATHS = List.of("/admin/users/add", "/admin/duties/add");
    private static final UrlPathHelper URL_PATH_HELPER = new UrlPathHelper();

    private final StringRedisTemplate redis;
    private final ObjectMapper objectMapper;
    private final long ttlHours;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String path = URL_PATH_HELPER.getPathWithinApplication(request);
        if (!"POST".equalsIgnoreCase(request.getMethod()) || !PATHS.contains(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        String idemHeader = request.getHeader("Idempotency-Key");
        if (idemHeader == null || idemHeader.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String principal = auth != null && auth.isAuthenticated() ? auth.getName() : "anonymous";
        String slot = TokenFingerprint.sha256Hex(
                principal + "|" + path + "|" + idemHeader.trim());
        String cacheKey = "idem:resp:" + slot;
        String lockKey = "idem:lock:" + slot;

        String cached = redis.opsForValue().get(cacheKey);
        if (cached != null) {
            writeCached(response, cached);
            return;
        }

        Boolean gotLock = redis.opsForValue().setIfAbsent(lockKey, "1", Duration.ofMinutes(2));
        if (Boolean.FALSE.equals(gotLock)) {
            writeProblem(response, request.getRequestURI(), HttpStatus.CONFLICT,
                    "A request with this idempotency key is already in progress. Retry shortly or use a new key.",
                    "IDEMPOTENCY_IN_FLIGHT");
            return;
        }

        ContentCachingResponseWrapper wrapped = new ContentCachingResponseWrapper(response);
        try {
            filterChain.doFilter(request, wrapped);
            int status = wrapped.getStatus();
            byte[] body = wrapped.getContentAsByteArray();
            String contentType = Optional.ofNullable(wrapped.getContentType()).orElse(MediaType.APPLICATION_JSON_VALUE);
            if (status >= 200 && status < 300 && body.length > 0) {
                String payload = objectMapper.createObjectNode()
                        .put("status", status)
                        .put("contentType", contentType)
                        .put("body", new String(body, StandardCharsets.UTF_8))
                        .toString();
                redis.opsForValue().set(cacheKey, payload, Duration.ofHours(ttlHours));
            }
            wrapped.copyBodyToResponse();
        } finally {
            redis.delete(lockKey);
        }
    }

    private void writeCached(HttpServletResponse response, String json) throws IOException {
        JsonNode n = objectMapper.readTree(json);
        response.setStatus(n.get("status").asInt());
        response.setContentType(n.get("contentType").asText());
        response.getOutputStream().write(n.get("body").asText().getBytes(StandardCharsets.UTF_8));
    }

    private void writeProblem(
            HttpServletResponse response,
            String path,
            HttpStatus status,
            String detail,
            String code) throws IOException {
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(status, detail);
        pd.setTitle("Conflict");
        pd.setInstance(URI.create(path));
        pd.setProperty("code", code);
        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), pd);
    }
}
