package com.apsrtc.userservice.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component("apiRequestContextFilter")
@RequiredArgsConstructor
public class RequestContextFilter extends OncePerRequestFilter {

    public static final String CORRELATION_ID_HEADER = "X-Correlation-Id";
    public static final String MDC_CORRELATION_ID = "correlationId";

    private final ObjectMapper objectMapper;
    private final LoginRateLimiter loginRateLimiter;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        String correlationId = Optional.ofNullable(request.getHeader(CORRELATION_ID_HEADER))
                .filter(s -> !s.isBlank())
                .orElseGet(() -> UUID.randomUUID().toString());
        MDC.put(MDC_CORRELATION_ID, correlationId);
        response.setHeader(CORRELATION_ID_HEADER, correlationId);

        try {
            if ("POST".equalsIgnoreCase(request.getMethod())
                    && "/auth/login".equals(request.getServletPath())) {
                if (!loginRateLimiter.tryConsume(clientIp(request))) {
                    writeRateLimitProblem(response, request.getRequestURI());
                    return;
                }
            }
            filterChain.doFilter(request, response);
        } finally {
            MDC.remove(MDC_CORRELATION_ID);
        }
    }

    private static String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return Optional.ofNullable(request.getRemoteAddr()).orElse("unknown");
    }

    private void writeRateLimitProblem(HttpServletResponse response, String path) throws IOException {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.TOO_MANY_REQUESTS,
                "Too many login attempts. Try again later.");
        problem.setTitle("Rate limit exceeded");
        problem.setInstance(URI.create(path));
        problem.setProperty("code", "LOGIN_RATE_LIMITED");
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_PROBLEM_JSON_VALUE);
        objectMapper.writeValue(response.getOutputStream(), problem);
    }
}
