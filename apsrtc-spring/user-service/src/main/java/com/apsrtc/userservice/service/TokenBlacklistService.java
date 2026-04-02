package com.apsrtc.userservice.service;

public interface TokenBlacklistService {

    void addToken(String token, long expiryTimeMillis);

    boolean isTokenBlacklisted(String token);
}
