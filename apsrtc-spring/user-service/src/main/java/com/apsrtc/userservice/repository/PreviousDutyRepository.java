package com.apsrtc.userservice.repository;

import com.apsrtc.userservice.model.PreviousDuty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreviousDutyRepository extends JpaRepository<PreviousDuty, String> {

    boolean existsByUserId(String userId);
    PreviousDuty findByUserId(String userId);
}
