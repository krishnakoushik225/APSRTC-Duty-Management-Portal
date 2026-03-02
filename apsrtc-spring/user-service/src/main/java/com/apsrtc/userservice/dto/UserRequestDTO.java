package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRequestDTO extends BaseUserDTO{

    @NotNull
    private String password;

}
