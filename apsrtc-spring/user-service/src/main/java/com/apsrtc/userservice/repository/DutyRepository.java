package com.apsrtc.userservice.repository;

import com.apsrtc.userservice.model.Duty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DutyRepository extends JpaRepository<Duty, Long> {

    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM Duty d " +
            "WHERE d.district = :district " +
            "AND d.depo = :depo " +
            "AND d.village = :village " +
            "AND d.busType = :busType " +
            "AND d.startDate = :startDate " +
            "AND d.endDate = :endDate " +
            "AND d.startTime = :startTime " +
            "AND d.endTime = :endTime")
    boolean existsDutyWithAllFields(
            @Param("district") String district,
            @Param("depo") String depo,
            @Param("village") String village,
            @Param("busType") String busType,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate,
            @Param("startTime") String startTime,
            @Param("endTime") String endTime
    );

    List<Duty> findByDistrictAndDepo(String district, String depo);

    void deleteByVillage(String village);
}
