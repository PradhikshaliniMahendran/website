package com.university.eventmanagement.controller;

import com.university.eventmanagement.dto.common.ApiResponse;
import com.university.eventmanagement.dto.common.PagedResponse;
import com.university.eventmanagement.dto.user.UserDto;
import com.university.eventmanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY_ADMINISTRATOR', 'STUDENT_AFFAIRS_MANAGER')")
    public ResponseEntity<ApiResponse<PagedResponse<UserDto>>> searchUsers(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PagedResponse<UserDto> response = userService.searchUsers(query, role, page, size);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable String id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserDto userDto) {
        UserDto updated = userService.updateUserProfile(userDetails.getUsername(), userDto);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDto>> toggleUserStatus(
            @PathVariable String id,
            @RequestParam boolean active) {
        UserDto updated = userService.toggleUserStatus(id, active);
        return ResponseEntity.ok(ApiResponse.success("User status updated", updated));
    }

    @PatchMapping("/avatar")
    public ResponseEntity<ApiResponse<UserDto>> updateAvatar(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String avatarUrl) {
        UserDto updated = userService.updateUserAvatar(userDetails.getUsername(), avatarUrl);
        return ResponseEntity.ok(ApiResponse.success("Avatar updated", updated));
    }
}
