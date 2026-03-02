package com.apsrtc.userservice.utils;

import com.apsrtc.userservice.dto.DutyResponseDTO;

public record DutyResponse(String message, DutyResponseDTO assignedDuty, DutyResponseDTO prevDuty) {}
