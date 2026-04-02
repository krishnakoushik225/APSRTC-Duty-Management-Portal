package com.apsrtc.userservice.security;

public interface LoginRateLimiter {

    boolean tryConsume(String clientIp);
}
