package com.university.eventmanagement.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;
    private String username;
    private String email;
    private String fullName;
    private String avatarUrl;
    private String phone;
    private String department;
    private String studentId;
    private boolean active;
    private Set<String> roles;
    private Instant createdAt;
    private Instant updatedAt;
}
