package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordDTO extends ChangePasswordRequestDTO{
    @NotNull
    private String currentPassword;
}
