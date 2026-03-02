package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequestDTO {

    @NotNull
    private String id;

    @NotNull
    private String password;
}
