package com.zyndex.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ResourceRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Category ID is required")
    private Long categoryId;
    
    @NotBlank(message = "Subject is required")
    private String subject;
    
    @NotBlank(message = "Resource type is required")
    private String resourceType; // "PDF", "ARTICLE", "VIDEO", "LINK"
    
    private String fileUrl;
    private String fileName;
}