package com.apsrtc.userservice.mapper;

import com.apsrtc.userservice.dto.DutyResponseDTO;
import com.apsrtc.userservice.model.Duty;
import com.apsrtc.userservice.model.PreviousDuty;
import com.apsrtc.userservice.repository.PreviousDutyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DutyMapper {

    private final PreviousDutyRepository prevDutyRepo;

    public Duty toDutyModel(Duty dto) {
        Duty duty = new Duty();
        duty.setDistrict(dto.getDistrict());
        duty.setDepo(dto.getDepo());
        duty.setVillage(dto.getVillage());
        duty.setBusType(dto.getBusType());
        duty.setStartDate(dto.getStartDate());
        duty.setStartTime(dto.getStartTime());
        duty.setEndDate(dto.getEndDate());
        duty.setEndTime(dto.getEndTime());
        return duty;
    }

    public Duty toDutyModel(DutyResponseDTO dto) {
        Duty duty = new Duty();
        duty.setDistrict(dto.getDistrict());
        duty.setDepo(dto.getDepo());
        duty.setVillage(dto.getVillage());
        duty.setBusType(dto.getBusType());
        duty.setStartDate(dto.getStartDate());
        duty.setStartTime(dto.getStartTime());
        duty.setEndDate(dto.getEndDate());
        duty.setEndTime(dto.getEndTime());
        return duty;
    }

    public DutyResponseDTO setNotAvailableData() {
        DutyResponseDTO duty = new DutyResponseDTO();
        duty.setDistrict("Not Available");
        duty.setDepo("Not Available");
        duty.setVillage("Not Available");
        duty.setBusType("Not Available");
        duty.setStartDate("Not Available");
        duty.setStartTime("Not Available");
        duty.setEndDate("Not Available");
        duty.setEndTime("Not Available");
        return duty;
    }

    public DutyResponseDTO toDutyDTO(Duty duty) {
        DutyResponseDTO dto = new DutyResponseDTO();
        dto.setDistrict(duty.getDistrict());
        dto.setDepo(duty.getDepo());
        dto.setVillage(duty.getVillage());
        dto.setBusType(duty.getBusType());
        dto.setStartDate(duty.getStartDate());
        dto.setEndDate(duty.getEndDate());
        dto.setStartTime(duty.getStartTime());
        dto.setEndTime(duty.getEndTime());
        return dto;
    }

    public PreviousDuty toPrevDutyModel(String userId, Duty oldDuty) {
        PreviousDuty prevDuty = new PreviousDuty();
        prevDuty.setUserId(userId);
        prevDuty.setDistrict(oldDuty.getDistrict());
        prevDuty.setDepo(oldDuty.getDepo());
        prevDuty.setVillage(oldDuty.getVillage());
        prevDuty.setBusType(oldDuty.getBusType());
        prevDuty.setStartDate(oldDuty.getStartDate());
        prevDuty.setEndDate(oldDuty.getEndDate());
        prevDuty.setStartTime(oldDuty.getStartTime());
        prevDuty.setEndTime(oldDuty.getEndTime());
        prevDutyRepo.save(prevDuty);
        return prevDuty;
    }

    public DutyResponseDTO toPrevDutyDTO(PreviousDuty duty) {
        DutyResponseDTO dto = new DutyResponseDTO();
        dto.setDistrict(duty.getDistrict());
        dto.setDepo(duty.getDepo());
        dto.setVillage(duty.getVillage());
        dto.setBusType(duty.getBusType());
        dto.setStartDate(duty.getStartDate());
        dto.setEndDate(duty.getEndDate());
        dto.setStartTime(duty.getStartTime());
        dto.setEndTime(duty.getEndTime());
        return dto;
    }

}
