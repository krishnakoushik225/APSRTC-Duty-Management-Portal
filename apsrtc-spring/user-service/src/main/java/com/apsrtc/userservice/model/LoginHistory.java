package com.apsrtc.userservice.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "login_histories")
public class LoginHistory {

    @Id
    @NotNull
    private String userId;

    @NotNull
    private long timestamp;

    @NotNull
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Duty data;

}
