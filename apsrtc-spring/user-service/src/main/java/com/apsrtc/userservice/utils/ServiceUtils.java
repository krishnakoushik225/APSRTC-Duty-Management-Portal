package com.apsrtc.userservice.utils;

import com.apsrtc.userservice.dto.UserRequestDTO;
import com.apsrtc.userservice.exception.DutyAlreadyExistsException;
import com.apsrtc.userservice.exception.UserOperationException;
import com.apsrtc.userservice.model.Duty;
import com.apsrtc.userservice.repository.DutyRepository;
import com.apsrtc.userservice.repository.UserRepository;

public class ServiceUtils {

    public static void isUserAlreadyExists(UserRepository userRepo, UserRequestDTO userRequestDTO) {
        if(userRepo.existsById(userRequestDTO.getId())) {
            throw new UserOperationException("Already an user exists with ID : " + userRequestDTO.getId());
        }
        if(userRepo.existsByEmail(userRequestDTO.getEmail())){
            throw new UserOperationException("Already an user exists with email : " + userRequestDTO.getEmail());
        }
        if (userRepo.existsByContactNumber(userRequestDTO.getContactNumber())) {
            throw new UserOperationException("Already user exists with the contact number : " + userRequestDTO.getContactNumber());
        }
    }

    public static void isDutyAlreadyExists(DutyRepository dutyRepo, Duty duty) {
        if(dutyRepo.existsDutyWithAllFields(duty.getDistrict(), duty.getDepo(), duty.getVillage(), duty.getBusType(),
                duty.getStartDate(), duty.getEndDate(), duty.getStartTime(), duty.getEndTime())) {
            throw new DutyAlreadyExistsException("Already duty exists with this details!");
        }
    }
}
