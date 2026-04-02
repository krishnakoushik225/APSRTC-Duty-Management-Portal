package com.apsrtc.userservice.service;

import com.apsrtc.userservice.dto.*;
import com.apsrtc.userservice.exception.PasswordMismatchException;
import com.apsrtc.userservice.exception.UserOperationException;
import com.apsrtc.userservice.mapper.DutyMapper;
import com.apsrtc.userservice.mapper.UserMapper;
import com.apsrtc.userservice.model.*;
import com.apsrtc.userservice.repository.LoginHistoryRepository;
import com.apsrtc.userservice.repository.PreviousDutyRepository;
import com.apsrtc.userservice.repository.UserRepository;
import com.apsrtc.userservice.utils.ServiceUtils;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PreviousDutyRepository prevDutyRepo;
    private final LoginHistoryRepository loginHistoryRepo;
    private final UserMapper userMapper;
    private final DutyMapper dutyMapper;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final EmailService emailService;
    private final LeaveService leaveService;
    private final ResetTokenService resetTokenService;

    @Transactional
    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
        ServiceUtils.isUserAlreadyExists(userRepo, userRequestDTO);
        User savedUser = userRepo.save(userMapper.toModel(userRequestDTO));
        return userMapper.toDTO(savedUser);
    }

    // The logic for login remains unchanged and should now work correctly
    public UserResponseDTO handleLogin(LoginRequestDTO dto) {
        User user = userRepo.findById(dto.getId()).orElseThrow(() -> new UserOperationException("User not found with ID : " + dto.getId()));
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new PasswordMismatchException("Please enter correct password!");
        }
        return userMapper.toDTO(user);
    }

    @Transactional
    public UserResponseDTO updatePassword(UpdatePasswordDTO dto, String userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UserOperationException("User not found with ID: " + userId));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new PasswordMismatchException("Current password is incorrect");
        }
        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            throw new PasswordMismatchException("New password and Confirm password do not match");
        }
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepo.save(user);

        return userMapper.toDTO(user);
    }

    public ResponseEntity<Map<String, String>> forgotPassword(String email) {
        String genericAck = "If an account exists for this email, you will receive an OTP shortly.";
        if (!userRepo.existsByEmail(email)) {
            log.info("Password reset requested for unknown email (no enumeration)");
            return ResponseEntity.ok(Map.of("message", genericAck));
        }
        String otp = otpService.generateOtp(email);
        try {
            emailService.sendOtpEmail(email, otp);
        } catch (Exception e) {
            log.error("Failed to send OTP email", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error sending email. Please try again later."));
        }
        String resetToken = resetTokenService.generateTokenForPasswordReset(email, "password_reset");
        return ResponseEntity.ok(Map.of(
                "message", "OTP sent successfully!",
                "resetToken", resetToken));
    }

    public ResponseEntity<Map<String, String>> validateOtp(String token, String otp) {
        Claims claims = resetTokenService.validateToken(token, "password_reset");
        String email = claims.getSubject();
        boolean valid = otpService.validateOtp(email, otp);
        if (!valid) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid or expired OTP"));
        }

        String verifiedToken = resetTokenService.generateTokenForPasswordReset(email, "password_reset_verified");
        return ResponseEntity.ok(Map.of(
                "message", "OTP verified successfully!",
                "verifiedToken", verifiedToken
        ));
    }

    public ResponseEntity<String> createNewPassword(ChangePasswordRequestDTO dto, String verifiedToken) {
        Claims claims = resetTokenService.validateToken(verifiedToken, "password_reset_verified");
        String email = claims.getSubject();
        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Password and Confirm password didn’t match!");
        }
        User user = userRepo.findByEmailIgnoreCase(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user found for this reset session.");
        }
        user.setPassword(passwordEncoder.encode(dto.getConfirmPassword()));
        userRepo.save(user);
        return ResponseEntity.ok("Password changed successfully!");
    }

    public ResponseEntity<LeaveResponseDTO> leaveRequest(Leave dto, String authenticatedUserId) {
        User user = userRepo.findById(authenticatedUserId)
                .orElseThrow(() -> new UserOperationException("User not found with ID: " + authenticatedUserId));
        dto.setUserId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return leaveService.handleLeaveRequest(dto);
    }

    public DutyResponseDTO getCurrentDuty(String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new UserOperationException("User not found with ID : " + id));
        LoginHistory loginHistory = loginHistoryRepo.findByUserId(user.getId());
        if (loginHistory == null) {
            return dutyMapper.setNotAvailableData();
        }
        return dutyMapper.toDutyDTO(loginHistory.getData());
    }

    public DutyResponseDTO getPreviousDuty(String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new UserOperationException("User not found with ID : " + id));
        PreviousDuty prevDuty = prevDutyRepo.findByUserId(user.getId());
        if(prevDuty == null) {
            return dutyMapper.setNotAvailableData();
        }
        return dutyMapper.toPrevDutyDTO(prevDuty);
    }
}