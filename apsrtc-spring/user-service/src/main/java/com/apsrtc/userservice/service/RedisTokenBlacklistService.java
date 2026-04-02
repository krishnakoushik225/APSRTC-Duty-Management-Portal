package com.apsrtc.userservice.service;

import com.apsrtc.userservice.util.TokenFingerprint;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.security.token-blacklist", havingValue = "redis")
public class RedisTokenBlacklistService implements TokenBlacklistService {

    private static final String KEY_PREFIX = "jwt:blk:";

    private final StringRedisTemplate redisTemplate;

    @Override
    public void addToken(String token, long expiryTimeMillis) {
        long ttlSeconds = Math.max(1L, (expiryTimeMillis - System.currentTimeMillis()) / 1000);
        String key = KEY_PREFIX + TokenFingerprint.sha256Hex(token);
        redisTemplate.opsForValue().set(key, "1", Duration.ofSeconds(ttlSeconds));
        log.debug("JWT blacklisted in Redis, TTL {}s", ttlSeconds);
    }

    @Override
    public boolean isTokenBlacklisted(String token) {
        String key = KEY_PREFIX + TokenFingerprint.sha256Hex(token);
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
}
