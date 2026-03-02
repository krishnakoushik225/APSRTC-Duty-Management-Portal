package com.apsrtc.userservice.service;

import com.apsrtc.userservice.dto.LeaveResponseDTO;
import com.apsrtc.userservice.model.Leave;
import com.apsrtc.userservice.repository.LeaveRepository;
import com.apsrtc.userservice.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LeaveService {

    private final UserRepository userRepo;
    private final LeaveRepository leaveRepo;
    private final EmailService emailService;

    public List<Leave> getPendingLeaves() {
        return leaveRepo.findByStatus("PENDING");
    }

    @Transactional
    public void updateLeaveStatus(Long id, String status) {
        Leave leave = leaveRepo.findByLeaveId(id);
        if(leave == null) {
            throw new RuntimeException("Leave id not found!");
        }
        if(status.equals("APPROVED")) {
            leave.setStatus(status);
            leaveRepo.save(leave);
        } else {
            leaveRepo.deleteByLeaveId(id);
        }
        String subject = "Leave Request " + status;
        String message = status.equals("APPROVED") ? "Your leave request has been " + status.toLowerCase() + "." : "Sorry to inform that your leave request has been " + status.toLowerCase() + " due to other circumstances. \n Thank you!";

        try {
            emailService.sendLeaveStatusMail(leave.getEmail(), message, subject);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public ResponseEntity<LeaveResponseDTO> handleLeaveRequest(Leave dto) {
        LocalDate today = LocalDate.now();
        boolean hasUserFoundInLeaveTable = leaveRepo.existsByUserId(dto.getUserId());
        Leave leaveDetails = leaveRepo.findByUserId(dto.getUserId());

        // CASE - leave should be applied one day before!
        if (today.equals(dto.getFromDate())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LeaveResponseDTO("/leave-request", "Leave should be applied one day before!"));
        }

        long daysBetween = ChronoUnit.DAYS.between(dto.getFromDate(), dto.getToDate()) + 1;
        if(daysBetween != 2) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LeaveResponseDTO("/leave-request", "Leave should be applied only for 2 days!"));
        }

        // CASE - Leave applied for the first time!
        else if (!hasUserFoundInLeaveTable && leaveDetails == null) {
            log.info("Leave applied for the first time!");
            leaveRepo.save(dto);
            try {
                emailService.sendLeaveMail(dto.getEmail(), dto.getFromDate(), dto.getToDate());
                return ResponseEntity.status(HttpStatus.OK).body(new LeaveResponseDTO("/dashboard", "Successfully requested for leave!"));
            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        } 
        // CASE - Leave already applied for these days!
        else if (leaveDetails.getFromDate().equals(dto.getFromDate()) && leaveDetails.getToDate().equals(dto.getToDate())) {
            log.warn("Leave already applied for these days!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LeaveResponseDTO("/dashboard", "Leave already applied for these days!"));
        }
        else if (leaveDetails.getStatus().equals("PENDING")) {
            log.warn("Already an active leave is in pending!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LeaveResponseDTO("redirect", "Already an active leave is in pending!"));
        }
        // CASE - Leave details are updated successfully!
        else {
            leaveDetails.setFromDate(dto.getFromDate());
            leaveDetails.setToDate(dto.getToDate());
            leaveDetails.setReason(dto.getReason());
            leaveDetails.setStatus("PENDING");
            try {
                emailService.sendLeaveMail(dto.getEmail(), dto.getFromDate(), dto.getToDate());
                return ResponseEntity.status(HttpStatus.OK).body(new LeaveResponseDTO("/dashboard", "Leave details are updated successfully!"));
            } catch (Exception e) {
                throw new RuntimeException(e.getMessage());
            }
        }
    }
}
