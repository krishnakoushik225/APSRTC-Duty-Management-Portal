package com.apsrtc.userservice.controller;

import com.apsrtc.userservice.dto.*;
import com.apsrtc.userservice.model.Duty;
import com.apsrtc.userservice.model.Leave;
import com.apsrtc.userservice.service.AdminService;
import com.apsrtc.userservice.service.DutyService;
import com.apsrtc.userservice.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final DutyService dutyService;
    private final LeaveService leaveService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/dashboard")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(Authentication authentication) {
        String adminId = (String) authentication.getPrincipal();
        List<UserResponseDTO> employees = adminService.getAllUsers(adminId);
        return ResponseEntity.ok(employees);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users/add")
    public ResponseEntity<UserResponseDTO> addUser(@RequestBody UserRequestDTO dto) {
        UserResponseDTO responseDTO = adminService.addUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponseDTO> getUserDetails(@PathVariable String id) {
        UserResponseDTO responseDTO = adminService.getUserDetails(id);
        return ResponseEntity.ok(responseDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/users/update/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable String id, @Validated @RequestBody BaseUserDTO dto) {
        UserResponseDTO responseDTO = adminService.updateUser(id, dto);
        return ResponseEntity.ok(responseDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users/search")
    public ResponseEntity<List<UserResponseDTO>> searchUsers(@RequestParam("keyword") String keyword) {
        List<UserResponseDTO> results = adminService.searchUsers(keyword);
        return ResponseEntity.ok(results);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/duties/add")
    public ResponseEntity<Duty> addDuty(@Validated @RequestBody Duty dutyData,
                                         @AuthenticationPrincipal String adminId) {
        Duty duty = dutyService.addDuty(dutyData, adminId);
        return ResponseEntity.status(HttpStatus.CREATED).body(duty);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/leaves/pending")
    public ResponseEntity<List<Leave>> getPendingLeaves(@AuthenticationPrincipal String id) {
        return ResponseEntity.ok(leaveService.getPendingLeaves());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/leaves/{id}/approve")
    public ResponseEntity<String> approve(@PathVariable("id") Long id) {
        leaveService.updateLeaveStatus(id, "APPROVED");
        return ResponseEntity.ok("Leave approved!");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/leaves/{id}/reject")
    public ResponseEntity<String> reject(@PathVariable("id") Long id) {
        leaveService.updateLeaveStatus(id, "REJECTED");
        return ResponseEntity.ok("Leave rejected!");
    }
}
