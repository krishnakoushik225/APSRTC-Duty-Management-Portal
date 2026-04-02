package com.apsrtc.userservice.service;

import com.apsrtc.userservice.util.TokenFingerprint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@ConditionalOnProperty(name = "app.security.token-blacklist", havingValue = "memory", matchIfMissing = true)
public class InMemoryTokenBlacklistService implements TokenBlacklistService {

    private final Map<String, Long> blacklist = new ConcurrentHashMap<>();

    @Override
    public void addToken(String token, long expiryTimeMillis) {
        String fp = TokenFingerprint.sha256Hex(token);
        blacklist.put(fp, expiryTimeMillis);
        log.debug("JWT added to in-memory blacklist (fingerprint only)");
    }

    @Override
    public boolean isTokenBlacklisted(String token) {
        String fp = TokenFingerprint.sha256Hex(token);
        blacklist.entrySet().removeIf(entry -> entry.getValue() < System.currentTimeMillis());
        return blacklist.containsKey(fp);
    }
}
