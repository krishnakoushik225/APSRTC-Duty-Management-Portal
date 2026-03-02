package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChangePasswordRequestDTO {
    @NotNull
    private String newPassword;

    @NotNull
    private String confirmPassword;
}
