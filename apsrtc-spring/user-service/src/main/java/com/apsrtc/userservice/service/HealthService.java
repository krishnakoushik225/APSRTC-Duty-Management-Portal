package com.apsrtc.userservice.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HealthService {

    public void performHealthCheck() {
        System.out.println("Health check logic executed at " + LocalDateTime.now());
    }
}
