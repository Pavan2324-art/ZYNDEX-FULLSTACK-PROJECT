package com.zyndex.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zyndex.backend.dto.request.ResourceRequest;
import com.zyndex.backend.dto.response.ResourceResponse;
import com.zyndex.backend.entity.Category;
import com.zyndex.backend.entity.Resource;
import com.zyndex.backend.entity.User;
import com.zyndex.backend.enums.ResourceType;
import com.zyndex.backend.exception.ResourceNotFoundException;
import com.zyndex.backend.repository.CategoryRepository;
import com.zyndex.backend.repository.ResourceRepository;
import com.zyndex.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional
    public ResourceResponse createResource(ResourceRequest request, String userEmail) {
        // Find category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        // Find user
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Create resource
        Resource resource = Resource.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(category)
                .subject(request.getSubject())
                .resourceType(ResourceType.valueOf(request.getResourceType()))
                .fileUrl(request.getFileUrl())
                .fileName(request.getFileName())
                .uploadedBy(user)
                .build();

        Resource savedResource = resourceRepository.save(resource);

        return mapToResponse(savedResource);
    }

    public List<ResourceResponse> getAllResources() {
        return resourceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Page<ResourceResponse> getAllResourcesPaginated(Pageable pageable) {
        return resourceRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    public ResourceResponse getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        return mapToResponse(resource);
    }

    public List<ResourceResponse> getResourcesByCategory(Long categoryId) {
        return resourceRepository.findByCategoryId(categoryId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ResourceResponse> searchResources(String keyword) {
        return resourceRepository.searchByKeyword("%" + keyword + "%").stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ResourceResponse updateResource(Long id, ResourceRequest request) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        resource.setTitle(request.getTitle());
        resource.setDescription(request.getDescription());
        resource.setCategory(category);
        resource.setSubject(request.getSubject());
        resource.setResourceType(ResourceType.valueOf(request.getResourceType()));
        resource.setFileUrl(request.getFileUrl());
        resource.setFileName(request.getFileName());

        Resource updatedResource = resourceRepository.save(resource);
        return mapToResponse(updatedResource);
    }

    @Transactional
    public void deleteResource(Long id) {
        if (!resourceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Resource not found with id: " + id);
        }
        resourceRepository.deleteById(id);
    }

    private ResourceResponse mapToResponse(Resource resource) {
        return ResourceResponse.builder()
                .id(resource.getId())
                .title(resource.getTitle())
                .description(resource.getDescription())
                .category(resource.getCategory().getName())
                .subject(resource.getSubject())
                .resourceType(resource.getResourceType().name())
                .fileUrl(resource.getFileUrl())
                .fileName(resource.getFileName())
                .uploadedBy(resource.getUploadedBy().getName())
                .createdAt(resource.getCreatedAt())
                .updatedAt(resource.getUpdatedAt())
                .build();
    }
}