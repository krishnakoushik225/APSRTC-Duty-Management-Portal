package com.apsrtc.userservice.controller;

import com.apsrtc.userservice.dto.DutyResponseDTO;
import com.apsrtc.userservice.dto.LeaveResponseDTO;
import com.apsrtc.userservice.dto.UpdatePasswordDTO;
import com.apsrtc.userservice.dto.UserResponseDTO;
import com.apsrtc.userservice.mapper.DutyMapper;
import com.apsrtc.userservice.model.*;
import com.apsrtc.userservice.repository.LoginHistoryRepository;
import com.apsrtc.userservice.repository.PreviousDutyRepository;
import jakarta.validation.Valid;
import com.apsrtc.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;
    private final LoginHistoryRepository loginHistoryRepo;
    private final PreviousDutyRepository prevDutyRepo;
    private final DutyMapper dutyMapper;

    @PutMapping("/change-password")
    public ResponseEntity<UserResponseDTO> updatePassword(
            @Valid @RequestBody UpdatePasswordDTO dto,
            @AuthenticationPrincipal String userId) {
        UserResponseDTO responseDTO = userService.updatePassword(dto, userId);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/leave-request")
    public ResponseEntity<LeaveResponseDTO> leaveRequest(@Valid @RequestBody Leave dto) {
        return userService.leaveRequest(dto);
    }

    @GetMapping("/{id}/current-duty")
    public ResponseEntity<DutyResponseDTO> getCurrentDuty(@Valid @PathVariable String id) {
        return ResponseEntity.ok(userService.getCurrentDuty(id));
    }

    @GetMapping("/{id}/previous-duty")
    public ResponseEntity<DutyResponseDTO> getPreviousDuty(@Valid @PathVariable String id) {
        return ResponseEntity.ok(userService.getPreviousDuty(id));
    }
}
