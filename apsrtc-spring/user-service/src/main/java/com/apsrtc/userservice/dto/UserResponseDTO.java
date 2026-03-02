package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class UserResponseDTO extends BaseUserDTO{

    @NotNull
    private LocalDate createdDate;

}
