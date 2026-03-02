package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LeaveResponseDTO {

    @NotNull
    private String redirect;

    @NotNull
    private String message;
}
