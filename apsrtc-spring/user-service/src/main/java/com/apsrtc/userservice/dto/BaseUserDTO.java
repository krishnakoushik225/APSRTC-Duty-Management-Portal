package com.apsrtc.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseUserDTO {

    @NotNull
    private String id;

    @NotNull(message = "Name should not be null")
    @Size(max = 50, message = "Name should not exceed 50 characters")
    private String name;

    @NotNull(message = "Email is required and should not be null")
    @Email
    private String email;

    @NotNull
    private String contactNumber;

    @NotNull
    private String category;

    @NotNull
    private String district;

    @NotNull
    private String depo;
}
