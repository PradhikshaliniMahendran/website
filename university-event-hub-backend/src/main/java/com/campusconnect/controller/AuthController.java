package com.campusconnect.controller;

import com.campusconnect.model.User;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.security.JwtTokenProvider;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        User user = userOpt.get();
        // Check password (or plain text fallback for dev seed)
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()) &&
            !loginRequest.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        String token = "Bearer " + tokenProvider.generateToken(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(user.getEmail(), null)
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is already registered!"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setIsActive(true);
        User savedUser = userRepository.save(user);

        String token = "Bearer " + tokenProvider.generateToken(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(savedUser.getEmail(), null)
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", savedUser);
        return ResponseEntity.ok(response);
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }
}
