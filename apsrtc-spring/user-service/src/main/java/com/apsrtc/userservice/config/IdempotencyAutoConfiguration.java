package com.apsrtc.userservice.config;

import com.apsrtc.userservice.security.IdempotencyFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.StringRedisTemplate;

@AutoConfiguration
@AutoConfigureAfter(RedisAutoConfiguration.class)
@ConditionalOnBean(StringRedisTemplate.class)
public class IdempotencyAutoConfiguration {

    @Bean
    public IdempotencyFilter idempotencyFilter(
            StringRedisTemplate redisTemplate,
            ObjectMapper objectMapper,
            @Value("${app.idempotency.ttl-hours:24}") long ttlHours) {
        return new IdempotencyFilter(redisTemplate, objectMapper, ttlHours);
    }
}
