package com.apsrtc.userservice.repository;

import com.apsrtc.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// It creates a User Repository that extends the base JPA Repository,
// and we pass in the entity(User) that we want this repository to control and UUID.
// After extending the JpaRepository - we get access to in-built create, update, delete operations.
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);
    boolean existsById(String id);
    boolean existsByContactNumber(String contactNumber);
    List<User> findByDistrictAndDepoAndCategoryIn(String district, String depo, List<String> category);
    @Query("SELECT e FROM User e WHERE " +
            "(LOWER(e.id) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.contactNumber) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND e.category <> 'ADMIN'")
    List<User> searchUsers(@Param("keyword") String keyword);

    @Query("SELECT u FROM User u WHERE LOWER(u.email) = LOWER(:email)")
    User findByEmailIgnoreCase(@Param("email") String email);

}
