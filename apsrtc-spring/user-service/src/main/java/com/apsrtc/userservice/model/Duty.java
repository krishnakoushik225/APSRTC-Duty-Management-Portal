package com.apsrtc.userservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "duty_details")
public class Duty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
