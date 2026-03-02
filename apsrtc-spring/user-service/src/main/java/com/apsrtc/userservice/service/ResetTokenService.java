package com.apsrtc.userservice.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class ResetTokenService {

    private final String SECRET = "my-strong-secret-key-which-is-hard-to-decode";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // Generating a short-lived token for resetting the password
    public String generateTokenForPasswordReset(String email, String purpose) {
        return Jwts.builder()
                .setSubject(email)
                .claim("purpose", purpose)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims validateToken(String token, String requiredPurpose) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        if (!requiredPurpose.equals(claims.get("purpose"))) {
            throw new RuntimeException("Invalid token purpose");
        }
        return claims;
    }
}
