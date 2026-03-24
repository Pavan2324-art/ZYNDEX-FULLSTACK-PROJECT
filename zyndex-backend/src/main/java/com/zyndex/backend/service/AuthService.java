package com.zyndex.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zyndex.backend.dto.request.LoginRequest;
import com.zyndex.backend.dto.request.RegisterRequest;
import com.zyndex.backend.dto.response.LoginResponse;
import com.zyndex.backend.dto.response.UserResponse;
import com.zyndex.backend.entity.User;
import com.zyndex.backend.enums.UserRole;
import com.zyndex.backend.exception.UnauthorizedException;
import com.zyndex.backend.repository.UserRepository;
import com.zyndex.backend.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        // Find user by email
    	System.out.println("Login attempt for: " + request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    System.out.println("FAILED: Email not found");
                    return new UnauthorizedException("Invalid email or password");
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("FAILED: Password mismatch");
            throw new UnauthorizedException("Invalid email or password");
        }

        // THIS IS THE MOST LIKELY CULPRIT
        System.out.println("DB Role: " + user.getRole().name() + " | Request Role: " + request.getRole());
        if (!user.getRole().name().equalsIgnoreCase(request.getRole())) {
            System.out.println("FAILED: Role mismatch");
            throw new UnauthorizedException("Invalid role selection");
        }

        System.out.println("SUCCESS: Login granted for " + user.getEmail());
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        // Build response
        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .phone(user.getPhone())
                .institution(user.getInstitution())
                .bio(user.getBio())
                .createdAt(user.getCreatedAt())
                .build();

        return LoginResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .user(userResponse)
                .build();
    }

    public UserResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Create new user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.valueOf(request.getRole()))
                .phone(request.getPhone())
                .institution(request.getInstitution())
                .build();

        User savedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .phone(savedUser.getPhone())
                .institution(savedUser.getInstitution())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }
}