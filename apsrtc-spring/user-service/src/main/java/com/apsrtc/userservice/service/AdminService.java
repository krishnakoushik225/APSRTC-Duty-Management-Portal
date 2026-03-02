package com.apsrtc.userservice.service;

import com.apsrtc.userservice.dto.BaseUserDTO;
import com.apsrtc.userservice.dto.UserRequestDTO;
import com.apsrtc.userservice.dto.UserResponseDTO;
import com.apsrtc.userservice.exception.UserOperationException;
import com.apsrtc.userservice.mapper.UserMapper;
import com.apsrtc.userservice.model.User;
import com.apsrtc.userservice.repository.UserRepository;
import com.apsrtc.userservice.utils.ServiceUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepo;
    private final UserMapper userMapper;

    public List<UserResponseDTO> getAllUsers(String adminId) {
        User admin = userRepo.findById(adminId)
                .orElseThrow(() -> new UserOperationException("Admin not found with ID: " + adminId));

        List<String> categories = Arrays.asList("CONDUCTOR", "DRIVER");

        List<User> users = userRepo.findByDistrictAndDepoAndCategoryIn(
                admin.getDistrict(), admin.getDepo(), categories
        );

        return users.stream().map(userMapper::toDTO).toList();
    }

    public UserResponseDTO addUser(UserRequestDTO dto) {
        ServiceUtils.isUserAlreadyExists(userRepo, dto);
        User user = userMapper.toModel(dto);
        User savedUser = userRepo.save(user);
        return userMapper.toDTO(savedUser);
    }

    public UserResponseDTO getUserDetails(String id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UserOperationException("User not found with id: " + id));
        return userMapper.toDTO(user);
    }

    public UserResponseDTO updateUser(String id, BaseUserDTO dto) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UserOperationException("User not found with the ID: " + id));
        if(!user.getEmail().equals(dto.getEmail())) {
            if (userRepo.existsByEmail(dto.getEmail())) {
                throw new UserOperationException("Already an user exists with email : " + dto.getEmail());
            }
        }
        if(!user.getContactNumber().equals(dto.getContactNumber())) {
            if (userRepo.existsByContactNumber(dto.getContactNumber())) {
                throw new UserOperationException("Already user exists with the contact number : " + dto.getContactNumber());
            }
        }
        user.setEmail(dto.getEmail());
        user.setContactNumber(dto.getContactNumber());
        user.setName(dto.getName());
        User updatedUser = userRepo.save(user);
        return userMapper.toDTO(updatedUser);
    }

    public void deleteUser(String id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new UserOperationException("User not found with the ID: " + id));
        userRepo.deleteById(user.getId());
    }

    public List<UserResponseDTO> searchUsers(String keyword) {
        List<User> users = userRepo.searchUsers(keyword);
        return users.stream().map(userMapper::toDTO).toList();
    }
}
