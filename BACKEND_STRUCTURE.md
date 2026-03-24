# Zyndex Backend - Spring Boot Structure

## Project Structure

```
zyndex-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── zyndex/
│   │   │           ├── ZyndexApplication.java
│   │   │           ├── config/
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   ├── JwtConfig.java
│   │   │           │   ├── CorsConfig.java
│   │   │           │   └── FileStorageConfig.java
│   │   │           ├── controller/
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── ResourceController.java
│   │   │           │   ├── UserController.java
│   │   │           │   └── FeedbackController.java
│   │   │           ├── service/
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── ResourceService.java
│   │   │           │   ├── UserService.java
│   │   │           │   ├── FeedbackService.java
│   │   │           │   ├── EmailService.java
│   │   │           │   └── FileStorageService.java
│   │   │           ├── repository/
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── ResourceRepository.java
│   │   │           │   ├── FeedbackRepository.java
│   │   │           │   └── RatingRepository.java
│   │   │           ├── model/
│   │   │           │   ├── User.java
│   │   │           │   ├── Resource.java
│   │   │           │   ├── Feedback.java
│   │   │           │   ├── Rating.java
│   │   │           │   └── Role.java (enum)
│   │   │           ├── dto/
│   │   │           │   ├── request/
│   │   │           │   │   ├── LoginRequest.java
│   │   │           │   │   ├── RegisterRequest.java
│   │   │           │   │   ├── ResourceUploadRequest.java
│   │   │           │   │   └── FeedbackRequest.java
│   │   │           │   └── response/
│   │   │           │       ├── AuthResponse.java
│   │   │           │       ├── ResourceResponse.java
│   │   │           │       ├── UserResponse.java
│   │   │           │       └── ApiResponse.java
│   │   │           ├── security/
│   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │           │   ├── JwtTokenProvider.java
│   │   │           │   └── UserPrincipal.java
│   │   │           ├── exception/
│   │   │           │   ├── GlobalExceptionHandler.java
│   │   │           │   ├── ResourceNotFoundException.java
│   │   │           │   ├── UnauthorizedException.java
│   │   │           │   └── BadRequestException.java
│   │   │           └── util/
│   │   │               ├── FileUploadUtil.java
│   │   │               └── ValidationUtil.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       └── application-prod.properties
│   └── test/
│       └── java/
│           └── com/
│               └── zyndex/
│                   ├── controller/
│                   ├── service/
│                   └── repository/
├── pom.xml
└── README.md
```

## Key Files Content

### 1. pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.zyndex</groupId>
    <artifactId>zyndex-backend</artifactId>
    <version>1.0.0</version>
    <name>Zyndex Backend</name>
    <description>Educational Resource Library Backend</description>
    
    <properties>
        <java.version>17</java.version>
        <jwt.version>0.11.5</jwt.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Boot Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- Spring Boot Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <!-- Spring Boot Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Spring Boot Mail -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>
        
        <!-- MySQL Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- PostgreSQL Driver (alternative) -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>${jwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>${jwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>${jwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- ModelMapper -->
        <dependency>
            <groupId>org.modelmapper</groupId>
            <artifactId>modelmapper</artifactId>
            <version>3.1.1</version>
        </dependency>
        
        <!-- Apache Commons FileUpload -->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.5</version>
        </dependency>
        
        <!-- Spring Boot Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <!-- Spring Security Test -->
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2. application.properties

```properties
# Application Name
spring.application.name=zyndex-backend

# Server Port
server.port=8080

# Database Configuration (MySQL)
spring.datasource.url=jdbc:mysql://localhost:3306/zyndex_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=YourSuperSecretKeyForJWTTokenGenerationMustBeLongEnough
jwt.expiration=86400000
# 24 hours in milliseconds

# File Upload Configuration
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB
file.upload-dir=./uploads

# Email Configuration (Gmail example)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# CORS Configuration
cors.allowed-origins=http://localhost:3000,http://localhost:5173
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed-headers=*
cors.allow-credentials=true

# Logging
logging.level.root=INFO
logging.level.com.zyndex=DEBUG
logging.file.name=logs/zyndex.log

# Actuator
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
```

### 3. Model Examples

#### User.java
```java
package com.zyndex.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    private String avatarUrl;
    
    private String bio;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Resource> uploadedResources = new HashSet<>();
    
    @ManyToMany
    @JoinTable(
        name = "user_favorites",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "resource_id")
    )
    private Set<Resource> favorites = new HashSet<>();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Feedback> feedbacks = new HashSet<>();
}
```

#### Resource.java
```java
package com.zyndex.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false)
    private String fileType; // PDF, DOC, VIDEO, etc.
    
    @Column(nullable = false)
    private String filePath;
    
    private String fileUrl;
    
    private Long fileSize; // in bytes
    
    private String thumbnailUrl;
    
    @Column(nullable = false)
    private Integer downloadCount = 0;
    
    @Column(nullable = false)
    private Integer viewCount = 0;
    
    private Double averageRating = 0.0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User user;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "resource", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Rating> ratings = new HashSet<>();
    
    @ManyToMany(mappedBy = "favorites")
    private Set<User> favoritedBy = new HashSet<>();
}
```

### 4. Controller Example

#### AuthController.java
```java
package com.zyndex.controller;

import com.zyndex.dto.request.LoginRequest;
import com.zyndex.dto.request.RegisterRequest;
import com.zyndex.dto.response.AuthResponse;
import com.zyndex.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String token) {
        authService.logout(token);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/admin-request")
    public ResponseEntity<String> requestAdminAccess(@Valid @RequestBody AdminRequestDto request) {
        authService.requestAdminAccess(request);
        return ResponseEntity.ok("Admin access request submitted successfully");
    }
}
```

### 5. Service Example

#### ResourceService.java
```java
package com.zyndex.service;

import com.zyndex.dto.request.ResourceUploadRequest;
import com.zyndex.dto.response.ResourceResponse;
import com.zyndex.exception.ResourceNotFoundException;
import com.zyndex.model.Resource;
import com.zyndex.model.User;
import com.zyndex.repository.ResourceRepository;
import com.zyndex.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ResourceService {
    
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final ModelMapper modelMapper;
    
    @Transactional
    public ResourceResponse uploadResource(ResourceUploadRequest request, 
                                          MultipartFile file, 
                                          Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        // Store file
        String filePath = fileStorageService.storeFile(file);
        
        Resource resource = Resource.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .category(request.getCategory())
            .fileType(file.getContentType())
            .filePath(filePath)
            .fileSize(file.getSize())
            .user(user)
            .build();
        
        resource = resourceRepository.save(resource);
        
        return modelMapper.map(resource, ResourceResponse.class);
    }
    
    public Page<ResourceResponse> getAllResources(Pageable pageable) {
        return resourceRepository.findAll(pageable)
            .map(resource -> modelMapper.map(resource, ResourceResponse.class));
    }
    
    public Page<ResourceResponse> searchResources(String query, Pageable pageable) {
        return resourceRepository.searchByTitleOrDescription(query, pageable)
            .map(resource -> modelMapper.map(resource, ResourceResponse.class));
    }
    
    @Transactional
    public void incrementDownloadCount(Long resourceId) {
        Resource resource = resourceRepository.findById(resourceId)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
        resource.setDownloadCount(resource.getDownloadCount() + 1);
        resourceRepository.save(resource);
    }
}
```

### 6. Repository Example

#### ResourceRepository.java
```java
package com.zyndex.repository;

import com.zyndex.model.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    
    Page<Resource> findByCategory(String category, Pageable pageable);
    
    @Query("SELECT r FROM Resource r WHERE " +
           "LOWER(r.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Resource> searchByTitleOrDescription(@Param("query") String query, 
                                              Pageable pageable);
    
    List<Resource> findTop6ByOrderByDownloadCountDesc();
    
    List<Resource> findByUserId(Long userId);
    
    @Query("SELECT r.category, COUNT(r) FROM Resource r GROUP BY r.category")
    List<Object[]> countByCategory();
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(500),
    bio TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Resources Table
```sql
CREATE TABLE resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500),
    file_size BIGINT,
    thumbnail_url VARCHAR(500),
    download_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    uploaded_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
);
```

### Feedback Table
```sql
CREATE TABLE feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    message TEXT NOT NULL,
    rating INT,
    status VARCHAR(50) DEFAULT 'PENDING',
    admin_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

## API Endpoints Overview

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- POST `/api/auth/admin-request` - Request admin access
- GET `/api/auth/me` - Get current user

### Resources
- GET `/api/resources` - Get all resources (paginated)
- GET `/api/resources/{id}` - Get resource by ID
- POST `/api/resources` - Upload resource (admin)
- PUT `/api/resources/{id}` - Update resource (admin)
- DELETE `/api/resources/{id}` - Delete resource (admin)
- GET `/api/resources/search` - Search resources
- GET `/api/resources/category/{category}` - Get by category
- GET `/api/resources/{id}/download` - Download resource
- POST `/api/resources/{id}/track` - Track download

### Users
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile
- POST `/api/users/avatar` - Upload avatar
- GET `/api/users/downloads` - Get download history
- GET `/api/users/favorites` - Get favorites
- POST `/api/users/favorites/{resourceId}` - Add to favorites
- DELETE `/api/users/favorites/{resourceId}` - Remove from favorites

### Feedback
- POST `/api/feedback` - Submit feedback
- POST `/api/feedback/contact` - Submit contact form
- GET `/api/feedback` - Get all feedback (admin)
- PUT `/api/feedback/{id}/status` - Update status (admin)
- POST `/api/feedback/{id}/respond` - Respond to feedback (admin)

## Security Configuration

The backend uses JWT (JSON Web Tokens) for authentication:
1. User logs in with credentials
2. Server validates and returns JWT token
3. Client includes token in Authorization header for subsequent requests
4. Server validates token on each protected endpoint

## Development Setup

1. Install Java 17 or higher
2. Install MySQL or PostgreSQL
3. Create database: `zyndex_db`
4. Update `application.properties` with your database credentials
5. Run: `mvn spring-boot:run`
6. API will be available at: `http://localhost:8080`

## Testing

Run tests with: `mvn test`

## Deployment

1. Build JAR: `mvn clean package`
2. Run JAR: `java -jar target/zyndex-backend-1.0.0.jar`
3. Configure environment variables for production

## Environment Variables (Production)

- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT secret key
- `MAIL_USERNAME` - Email service username
- `MAIL_PASSWORD` - Email service password
- `FILE_UPLOAD_DIR` - File upload directory path
