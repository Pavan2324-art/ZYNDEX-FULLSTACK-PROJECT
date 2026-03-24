package com.zyndex.backend.repository;

import com.zyndex.backend.entity.Resource;
import com.zyndex.backend.enums.ResourceType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    
    // Find by category
    List<Resource> findByCategoryId(Long categoryId);
    
    // Find by subject
    List<Resource> findBySubject(String subject);
    
    // Find by resource type
    List<Resource> findByResourceType(ResourceType resourceType);
    
    // Find by uploaded user
    List<Resource> findByUploadedById(Long userId);
    
    // Search by title (case-insensitive)
    List<Resource> findByTitleContainingIgnoreCase(String title);
    
    // JPQL - Complex query with joins
    @Query("SELECT r FROM Resource r JOIN r.category c WHERE c.name = :categoryName AND r.subject = :subject")
    List<Resource> findByCategoryNameAndSubject(
        @Param("categoryName") String categoryName, 
        @Param("subject") String subject
    );
    
    // Pagination and Sorting
    Page<Resource> findAll(Pageable pageable);
    
    // Count resources by category
    long countByCategoryId(Long categoryId);
    
    // HQL with aggregate functions
    @Query("SELECT COUNT(r) FROM Resource r WHERE r.uploadedBy.id = :userId")
    long countResourcesByUser(@Param("userId") Long userId);
    
    // Named parameters in HQL
    @Query("SELECT r FROM Resource r WHERE r.title LIKE :keyword OR r.description LIKE :keyword")
    List<Resource> searchByKeyword(@Param("keyword") String keyword);
}