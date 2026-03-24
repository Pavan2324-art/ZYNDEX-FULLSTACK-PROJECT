package com.zyndex.backend.repository;

import com.zyndex.backend.entity.Feedback;
import com.zyndex.backend.enums.FeedbackStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
    // Find by user
    List<Feedback> findByUserId(Long userId);
    
    // Find by status
    List<Feedback> findByStatus(FeedbackStatus status);
    
    // Find pending feedback
    List<Feedback> findByStatusOrderByCreatedAtDesc(FeedbackStatus status);
    
    // Count by status
    long countByStatus(FeedbackStatus status);
}