package com.apsrtc.userservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "leaves")
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leaveId;

    @NotNull
    private String name;

    @NotNull
    private String userId;

    @NotNull
    private String email;

    @NotNull
    private String reason;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(columnDefinition = "DATE")
    private LocalDate fromDate;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(columnDefinition = "DATE")
    private LocalDate toDate;

    private String status;

    @PrePersist
    protected void leaveStatus() {
        this.status = "PENDING";
    }
}
