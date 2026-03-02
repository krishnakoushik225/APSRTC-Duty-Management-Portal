package com.apsrtc.userservice.controller;

import com.apsrtc.userservice.dto.*;
import com.apsrtc.userservice.security.JwtUtil;
import com.apsrtc.userservice.service.DutyService;
import com.apsrtc.userservice.service.TokenBlacklistService;
import com.apsrtc.userservice.utils.AuthResponse;
import com.apsrtc.userservice.utils.DutyResponse;
import com.apsrtc.userservice.utils.UserResponse;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.apsrtc.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {
    private final UserService userService;
    private final DutyService dutyService;
    private final TokenBlacklistService tokenBlacklistService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> handleRegister(@Valid @RequestBody UserRequestDTO dto) {
        UserResponseDTO responseDTO = userService.createUser(dto);
        return ResponseEntity.ok("User created successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> handleLogin(@RequestBody LoginRequestDTO dto) {
        UserResponseDTO responseDTO = userService.handleLogin(dto);
        String token = jwtUtil.generateToken(responseDTO);
        AuthResponse authResponse = new AuthResponse(token, responseDTO);
        if (responseDTO.getCategory().equals("ADMIN")) {
            return ResponseEntity.ok(authResponse);
        }
        DutyResponse dutyResponse = dutyService.assignDuty(responseDTO);
        return ResponseEntity.ok(new UserResponse(authResponse, dutyResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> handleLogout(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        Claims claims = jwtUtil.getClaims(header);
        long expiryTimeMillis = claims.getExpiration().getTime();
        tokenBlacklistService.addToken(header.substring(7), expiryTimeMillis);
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> handleResetPassword(@RequestBody ForgotPasswordRequestDTO dto) {
        return userService.forgotPassword(dto.getEmail());
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> handleValidateOtp(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ValidateOtpRequestDTO dto) {
        String token = authHeader.replace("Bearer ", "");
        return userService.validateOtp(token, dto.getOtp());
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> handleCreateNewPassword(@RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ChangePasswordRequestDTO dto) {
        String token = authHeader.replace("Bearer ", "");
        return userService.createNewPassword(dto, token);
    }

}