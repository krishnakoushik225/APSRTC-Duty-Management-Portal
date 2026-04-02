package com.apsrtc.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailException;
import org.springframework.retry.backoff.ExponentialBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;

import java.time.Duration;
import java.util.Collections;

@Configuration
public class RetryConfig {

    @Bean
    public RetryTemplate mailRetryTemplate() {
        SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy(
                4,
                Collections.singletonMap(MailException.class, true),
                true);
        ExponentialBackOffPolicy backoff = new ExponentialBackOffPolicy();
        backoff.setInitialInterval(Duration.ofMillis(400).toMillis());
        backoff.setMultiplier(2.0);
        backoff.setMaxInterval(Duration.ofSeconds(5).toMillis());
        RetryTemplate template = new RetryTemplate();
        template.setRetryPolicy(retryPolicy);
        template.setBackOffPolicy(backoff);
        return template;
    }
}
