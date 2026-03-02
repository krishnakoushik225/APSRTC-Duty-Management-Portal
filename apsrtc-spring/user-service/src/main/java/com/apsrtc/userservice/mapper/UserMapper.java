package com.apsrtc.userservice.mapper;

import com.apsrtc.userservice.dto.UserRequestDTO;
import com.apsrtc.userservice.dto.UserResponseDTO;
import com.apsrtc.userservice.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    // Manual constructor for dependency injection
    public UserMapper(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User toModel(UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setName(userRequestDTO.getName());
        user.setId(userRequestDTO.getId());
        user.setEmail(userRequestDTO.getEmail());
        user.setContactNumber(userRequestDTO.getContactNumber());
        user.setCategory(userRequestDTO.getCategory().toUpperCase());
        user.setDistrict(userRequestDTO.getDistrict());
        user.setDepo(userRequestDTO.getDepo());
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        return user;
    }

    public UserResponseDTO toDTO(User user) {
        UserResponseDTO responseDto = new UserResponseDTO();
        responseDto.setId(user.getId());
        responseDto.setName(user.getName());
        responseDto.setEmail(user.getEmail());
        responseDto.setContactNumber(user.getContactNumber());
        responseDto.setCategory(user.getCategory().toUpperCase());
        responseDto.setDistrict(user.getDistrict());
        responseDto.setDepo(user.getDepo());
        responseDto.setCreatedDate(user.getCreatedDate());
        return responseDto;
    }
}