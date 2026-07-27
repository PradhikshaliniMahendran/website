package com.university.eventmanagement.service;

import com.university.eventmanagement.dto.auth.*;
import com.university.eventmanagement.dto.common.PagedResponse;
import com.university.eventmanagement.dto.user.UserDto;

public interface UserService {
    JwtResponse authenticateUser(LoginRequest loginRequest);
    UserDto registerUser(RegisterRequest registerRequest);
    UserDto getCurrentUserProfile(String username);
    UserDto updateUserProfile(String username, UserDto userDto);
    void changePassword(String username, ChangePasswordRequest request);
    void forgotPassword(ForgotPasswordRequest request);
    void resetPassword(ResetPasswordRequest request);
    UserDto updateUserAvatar(String username, String avatarUrl);
    UserDto toggleUserStatus(String userId, boolean active);
    PagedResponse<UserDto> searchUsers(String query, String role, int page, int size);
    UserDto getUserById(String id);
}
