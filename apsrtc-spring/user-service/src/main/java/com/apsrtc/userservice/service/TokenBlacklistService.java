package com.apsrtc.userservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class TokenBlacklistService {

    // Map stores token and its expiry timestamp
    private final Map<String, Long> blacklist = new ConcurrentHashMap<>();

    public void addToken(String token, long expiryTimeMillis) {
        blacklist.put(token, expiryTimeMillis);
        log.info("The token {} is added to the blacklist!", blacklist.get(token));
    }

    public boolean isTokenBlacklisted(String token) {
        // Remove expired tokens automatically
        blacklist.entrySet().removeIf(entry -> entry.getValue() < System.currentTimeMillis());
        return blacklist.containsKey(token);
    }
}

