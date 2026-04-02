package com.apsrtc.userservice.controller;

import com.apsrtc.userservice.dto.DutyResponseDTO;
import com.apsrtc.userservice.dto.LeaveResponseDTO;
import com.apsrtc.userservice.dto.UpdatePasswordDTO;
import com.apsrtc.userservice.dto.UserResponseDTO;
import com.apsrtc.userservice.model.Leave;
import jakarta.validation.Valid;
import com.apsrtc.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;

    @PutMapping("/change-password")
    public ResponseEntity<UserResponseDTO> updatePassword(
            @Valid @RequestBody UpdatePasswordDTO dto,
            @AuthenticationPrincipal String userId) {
        UserResponseDTO responseDTO = userService.updatePassword(dto, userId);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/leave-request")
    public ResponseEntity<LeaveResponseDTO> leaveRequest(
            @AuthenticationPrincipal String userId,
            @Valid @RequestBody Leave dto) {
        return userService.leaveRequest(dto, userId);
    }

    @GetMapping("/{id}/current-duty")
    public ResponseEntity<DutyResponseDTO> getCurrentDuty(
            @PathVariable String id,
            @AuthenticationPrincipal String userId) {
        assertSelfAccess(id, userId);
        return ResponseEntity.ok(userService.getCurrentDuty(id));
    }

    @GetMapping("/{id}/previous-duty")
    public ResponseEntity<DutyResponseDTO> getPreviousDuty(
            @PathVariable String id,
            @AuthenticationPrincipal String userId) {
        assertSelfAccess(id, userId);
        return ResponseEntity.ok(userService.getPreviousDuty(id));
    }

    private static void assertSelfAccess(String pathUserId, String authenticatedUserId) {
        if (authenticatedUserId == null || !authenticatedUserId.equals(pathUserId)) {
            throw new AccessDeniedException("You can only access your own duty information");
        }
    }
}
