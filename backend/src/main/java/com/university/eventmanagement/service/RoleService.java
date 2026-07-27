package com.university.eventmanagement.service;

import com.university.eventmanagement.dto.role.CreateRoleRequest;
import com.university.eventmanagement.dto.role.RoleDto;
import com.university.eventmanagement.dto.user.UserDto;

import java.util.List;

public interface RoleService {
    List<RoleDto> getAllRoles();
    RoleDto getRoleById(String id);
    RoleDto createRole(CreateRoleRequest request);
    RoleDto updateRole(String id, CreateRoleRequest request);
    void deleteRole(String id);
    UserDto assignRoleToUser(String userId, List<String> roles);
}
