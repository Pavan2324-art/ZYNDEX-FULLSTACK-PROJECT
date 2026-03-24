package com.zyndex.backend.repository;

import com.zyndex.backend.entity.User;
import com.zyndex.backend.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Derived Query Method
    Optional<User> findByEmail(String email);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Find users by role
    List<User> findByRole(UserRole role);
    
    // JPQL Query - Custom query
    @Query("SELECT u FROM User u WHERE u.name LIKE %:name%")
    List<User> searchByName(@Param("name") String name);
    
    // Count users by role
    long countByRole(UserRole role);
    
    // Native SQL Query
    @Query(value = "SELECT * FROM users WHERE institution = :institution", nativeQuery = true)
    List<User> findByInstitutionNative(@Param("institution") String institution);
}