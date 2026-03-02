package com.apsrtc.userservice.utils;

import com.apsrtc.userservice.dto.UserResponseDTO;

public record AuthResponse(String token, UserResponseDTO user) {}
