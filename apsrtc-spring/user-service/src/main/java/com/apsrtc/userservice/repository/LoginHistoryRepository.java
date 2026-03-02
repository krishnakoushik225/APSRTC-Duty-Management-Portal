package com.apsrtc.userservice.repository;

import com.apsrtc.userservice.model.LoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginHistoryRepository extends JpaRepository<LoginHistory, String> {

    LoginHistory findByUserId(String userId);
}
