package com.apsrtc.userservice.service;

import com.apsrtc.userservice.dto.DutyResponseDTO;
import com.apsrtc.userservice.dto.UserResponseDTO;
import com.apsrtc.userservice.exception.UserOperationException;
import com.apsrtc.userservice.mapper.DutyMapper;
import com.apsrtc.userservice.mapper.LoginHistoryMapper;
import com.apsrtc.userservice.model.*;
import com.apsrtc.userservice.repository.*;
import com.apsrtc.userservice.utils.DutyResponse;
import com.apsrtc.userservice.utils.ServiceUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class DutyService {

    private final UserRepository userRepo;
    private final DutyRepository dutyRepo;
    private final DutyMapper dutyMapper;
    private final LeaveService leaveService;
    private final PreviousDutyRepository prevDutyRepo;
    private final LoginHistoryRepository loginHistoryRepo;
    private final LeaveRepository leaveRepo;
    private final LoginHistoryMapper loginHistoryMapper;

    public Duty addDuty(Duty dutyData, String adminId) {
        User user = userRepo.findById(adminId)
                .orElseThrow(() -> new UserOperationException("User not found with ID: " + adminId));
        // Check if duty already exists
        ServiceUtils.isDutyAlreadyExists(dutyRepo, dutyData);
        Duty duty = dutyMapper.toDutyModel(dutyData);
        return dutyRepo.save(duty);
    }

    public Duty getRandomDuty(List<Duty> availableDuties) {
        final Random random = new Random();
        if(availableDuties == null || availableDuties.isEmpty()) {
            throw new IllegalArgumentException("List of duties cannot be empty!");
        }
        int index = random.nextInt(availableDuties.size());
        return availableDuties.get(index);
    }

    @Transactional
    public PreviousDuty updatePrevDutyDetails(String userId, Duty oldDuty) {
        PreviousDuty userPrevDuty = prevDutyRepo.findByUserId(userId);
        if(userPrevDuty == null) {
            throw new RuntimeException("Previous duty details are not found for the user with ID : " + userId);
        }
        userPrevDuty.setUserId(userId);
        userPrevDuty.setDistrict(oldDuty.getDistrict());
        userPrevDuty.setDepo(oldDuty.getDepo());
        userPrevDuty.setVillage(oldDuty.getVillage());
        userPrevDuty.setBusType(oldDuty.getBusType());
        userPrevDuty.setStartDate(oldDuty.getStartDate());
        userPrevDuty.setEndDate(oldDuty.getEndDate());
        userPrevDuty.setStartTime(oldDuty.getStartTime());
        userPrevDuty.setEndTime(oldDuty.getEndTime());
        prevDutyRepo.save(userPrevDuty);
        return userPrevDuty;
    }

    @Transactional
    public DutyResponse assignDuty(UserResponseDTO userDTO) {
        if(userDTO.getCreatedDate().equals(LocalDate.now())) {
            DutyResponseDTO dto = dutyMapper.setNotAvailableData();
            return new DutyResponse("User is created today!", dto, dto);
        }

        List<Duty> availableDuties = dutyRepo.findByDistrictAndDepo(userDTO.getDistrict(), userDTO.getDepo());
        long currentTimeMillis = System.currentTimeMillis();
        LoginHistory hasTimeStampFound = loginHistoryRepo.findByUserId(userDTO.getId());
        boolean hasPrevDutyFound = prevDutyRepo.existsByUserId(userDTO.getId());
        Leave userLeaveDetails = leaveRepo.findByUserId(userDTO.getId());

        if(hasTimeStampFound == null && !hasPrevDutyFound) {
            // Applied for leave, not done any duty yet...
            if(userLeaveDetails != null && (userLeaveDetails.getFromDate().equals(LocalDate.now()) || userLeaveDetails.getToDate().equals(LocalDate.now()))
                    && userLeaveDetails.getStatus().equals("APPROVED")) {
                loginHistoryMapper.toModel(userDTO.getId(), currentTimeMillis, dutyMapper.toDutyModel(dutyMapper.setNotAvailableData()));
                return new DutyResponse("User is on leave!", dutyMapper.setNotAvailableData(), dutyMapper.setNotAvailableData());
            }
            // No timestamps in the database, no leaves in the database.
            Duty randomDuty = getRandomDuty(availableDuties);
            loginHistoryMapper.toModel(userDTO.getId(), currentTimeMillis, randomDuty);
            dutyRepo.deleteByVillage(randomDuty.getVillage());
            return new DutyResponse("Duty assigned for user!", dutyMapper.toDutyDTO(randomDuty), dutyMapper.setNotAvailableData());
        }
        // If within the 2-day window, display the data
        if(hasTimeStampFound != null && currentTimeMillis - hasTimeStampFound.getTimestamp() <= 2 * 24 * 60 * 60 * 1000) {
            LoginHistory alreadyData = loginHistoryRepo.findByUserId(userDTO.getId());
            PreviousDuty prevDuty = prevDutyRepo.findByUserId(userDTO.getId());
            return new DutyResponse("Current duty is in progress!", dutyMapper.toDutyDTO(alreadyData.getData()), prevDuty == null ? dutyMapper.setNotAvailableData() : dutyMapper.toPrevDutyDTO(prevDuty));
        }
        // If more than 2 days have passed, reset the login timestamp
        else {
            Leave findLeavedUser = leaveRepo.findByUserId(userDTO.getId());
            if(findLeavedUser != null && (findLeavedUser.getFromDate().equals(LocalDate.now()) || findLeavedUser.getToDate().equals(LocalDate.now()))
                    && findLeavedUser.getStatus().equals("APPROVED")) {
                LoginHistory getOldDuty = loginHistoryRepo.findByUserId(userDTO.getId());
                loginHistoryMapper.updateModelWithNotAvailableData(userDTO.getId());
                PreviousDuty previousDuty = updatePrevDutyDetails(userDTO.getId(), getOldDuty.getData());
                return new DutyResponse("More than 2 days, reset the login timestamp!", dutyMapper.setNotAvailableData(), dutyMapper.toPrevDutyDTO(previousDuty));
            } else {
                log.info("This is the second timestamp saved case!");
                Duty randomDuty = getRandomDuty(availableDuties);
                dutyRepo.deleteByVillage(randomDuty.getVillage());
                LoginHistory oldDuty = loginHistoryRepo.findByUserId(userDTO.getId());
                PreviousDuty previousDuty = prevDutyRepo.findByUserId(userDTO.getId());
                if(previousDuty != null) {
                    PreviousDuty userPreviousDuty = updatePrevDutyDetails(userDTO.getId(), oldDuty.getData());
                    loginHistoryMapper.updateModel(userDTO.getId(), currentTimeMillis, randomDuty);
                    return new DutyResponse("Regular employee not on leave!", dutyMapper.toDutyDTO(randomDuty), dutyMapper.toPrevDutyDTO(userPreviousDuty));
                } else {
                    PreviousDuty userPreviousDuty = dutyMapper.toPrevDutyModel(userDTO.getId(), oldDuty.getData());
                    loginHistoryMapper.updateModel(userDTO.getId(), currentTimeMillis, randomDuty);
                    return new DutyResponse("Regular employee not on leave!", dutyMapper.toDutyDTO(randomDuty), dutyMapper.toPrevDutyDTO(userPreviousDuty));
                }
            }
        }
    }
}
