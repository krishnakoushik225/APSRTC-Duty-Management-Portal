package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DutyResponseDTO{

    @NotNull
    private String district;

    @NotNull
    private String depo;

    @NotNull
    private String village;

    @NotNull
    private String busType;

    @NotNull
    private String startDate;

    @NotNull
    private String endDate;

    @NotNull
    private String startTime;

    @NotNull
    private String endTime;
}
