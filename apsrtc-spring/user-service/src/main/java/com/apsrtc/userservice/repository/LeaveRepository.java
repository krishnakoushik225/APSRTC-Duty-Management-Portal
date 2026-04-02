package com.apsrtc.userservice.repository;

import com.apsrtc.userservice.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {
    boolean existsByUserId(String userId);
    Leave findByUserId(String userId);
    List<Leave> findByStatus(String status);
    Leave findByLeaveId(Long id);
    void deleteByLeaveId(Long id);
}
