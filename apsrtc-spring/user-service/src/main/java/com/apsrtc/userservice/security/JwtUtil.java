package com.apsrtc.userservice.security;

import com.apsrtc.userservice.dto.UserResponseDTO;
import com.apsrtc.userservice.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final UserRepository userRepo;

    public JwtUtil(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    private final String SECRET = "my-strong-secret-key-which-is-hard-to-decode";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // Generate token with user ID and role
    public String generateToken(UserResponseDTO dto) {
        return Jwts.builder()
                .setSubject(dto.getId())
                .claim("role", dto.getCategory())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24h expiry
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract user ID from token
    public String getUserIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Extract role from token
    public String getUserRoleFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    public Claims getClaims(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            return (Claims) ResponseEntity.badRequest().body("No token provided");
        }
        String token = header.substring(7);
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}