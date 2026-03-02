package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidateOtpRequestDTO {
    @NotNull
    @Email
    private String email;

    @NotNull
    private String otp;
}
