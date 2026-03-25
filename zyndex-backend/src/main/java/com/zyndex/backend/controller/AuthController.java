package com.zyndex.backend.controller;

import com.zyndex.backend.dto.request.LoginRequest;
import com.zyndex.backend.dto.request.RegisterRequest;
import com.zyndex.backend.dto.response.LoginResponse;
import com.zyndex.backend.dto.response.UserResponse;
import com.zyndex.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://fascinating-dusk-4a35ac.netlify.app")
public class AuthController {

    private final AuthService authService;
    

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}