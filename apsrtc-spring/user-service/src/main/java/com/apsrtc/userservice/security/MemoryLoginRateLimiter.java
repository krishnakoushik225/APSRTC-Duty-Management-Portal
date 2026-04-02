package com.apsrtc.userservice.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@ConditionalOnProperty(name = "app.security.login-rate-limit.backend", havingValue = "memory", matchIfMissing = true)
public class MemoryLoginRateLimiter implements LoginRateLimiter {

    @Value("${app.security.login-rate-limit.capacity:30}")
    private int capacity;

    @Value("${app.security.login-rate-limit.refill-minutes:1}")
    private int refillMinutes;

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    public boolean tryConsume(String clientIp) {
        Bucket bucket = buckets.computeIfAbsent(clientIp, k -> newBucket());
        return bucket.tryConsume(1);
    }

    private Bucket newBucket() {
        Refill refill = Refill.intervally(capacity, Duration.ofMinutes(refillMinutes));
        Bandwidth limit = Bandwidth.classic(capacity, refill);
        return Bucket.builder().addLimit(limit).build();
    }
}
