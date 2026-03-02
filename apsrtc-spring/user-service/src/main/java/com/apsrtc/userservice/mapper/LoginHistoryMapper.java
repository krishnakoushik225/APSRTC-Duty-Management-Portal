package com.apsrtc.userservice.mapper;

import com.apsrtc.userservice.exception.UserOperationException;
import com.apsrtc.userservice.model.Duty;
import com.apsrtc.userservice.model.LoginHistory;
import com.apsrtc.userservice.repository.LoginHistoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LoginHistoryMapper {

    private final LoginHistoryRepository loginHistoryRepo;
    private final DutyMapper dutyMapper;

    public void toModel(String userId, long timestamp, Duty duty) {
        LoginHistory loginHistory = new LoginHistory();
        loginHistory.setUserId(userId);
        loginHistory.setTimestamp(timestamp);
        loginHistory.setData(duty);
        loginHistoryRepo.save(loginHistory);
    }

    // Sets the Not Available data if the user is on leave!
    @Transactional
    public void updateModelWithNotAvailableData(String userId) {
        LoginHistory userLoginHistory = loginHistoryRepo.findByUserId(userId);
        if (userLoginHistory == null) {
            throw new UserOperationException("User with ID " + userId + " not found.");
        }
        userLoginHistory.setData(dutyMapper.toDutyModel(dutyMapper.setNotAvailableData()));
        loginHistoryRepo.save(userLoginHistory);
    }

    @Transactional
    public void updateModel(String userId, long timestamp, Duty duty) {
        LoginHistory userLoginHistory = loginHistoryRepo.findByUserId(userId);
        if (userLoginHistory == null) {
            throw new UserOperationException("User with ID " + userId + " not found.");
        }
        userLoginHistory.setUserId(userId);
        userLoginHistory.setTimestamp(timestamp);
        userLoginHistory.setData(duty);
        loginHistoryRepo.save(userLoginHistory);
    }
}
