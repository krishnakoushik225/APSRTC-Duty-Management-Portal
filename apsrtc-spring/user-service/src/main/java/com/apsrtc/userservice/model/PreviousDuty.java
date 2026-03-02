package com.apsrtc.userservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "previous_duties")
public class PreviousDuty{

    @Id
    @NotNull
    private String userId;

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
