package com.apsrtc.userservice.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.security.login-rate-limit.backend", havingValue = "redis")
public class RedisLoginRateLimiter implements LoginRateLimiter {

    private static final String KEY_PREFIX = "login:rl:";

    private final StringRedisTemplate redis;

    @Value("${app.security.login-rate-limit.capacity:30}")
    private int capacity;

    @Value("${app.security.login-rate-limit.refill-minutes:1}")
    private int refillMinutes;

    @Override
    public boolean tryConsume(String clientIp) {
        String key = KEY_PREFIX + clientIp;
        String cur = redis.opsForValue().get(key);
        if (cur != null && Long.parseLong(cur) >= capacity) {
            return false;
        }
        Long count = redis.opsForValue().increment(key);
        if (count != null && count == 1L) {
            redis.expire(key, Duration.ofMinutes(refillMinutes));
        }
        return count != null && count <= capacity;
    }
}
