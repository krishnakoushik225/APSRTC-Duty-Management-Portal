package com.apsrtc.userservice.security;

import com.apsrtc.userservice.service.HealthService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class HealthScheduler {

    private final HealthService healthService;

    public HealthScheduler(HealthService healthService) {
        this.healthService = healthService;
    }
    @Scheduled(cron = "0 */14 * * * ?")
    public void runEvery14Minutes() {
        try {
            healthService.performHealthCheck();
        } catch (Exception ex) {
            // Never let a scheduled job crash silently
            System.err.println("Health job failed: " + ex.getMessage());
        }
    }
}
