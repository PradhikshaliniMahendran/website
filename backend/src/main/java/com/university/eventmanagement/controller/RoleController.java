package com.university.eventmanagement.controller;

import com.university.eventmanagement.dto.common.ApiResponse;
import com.university.eventmanagement.dto.role.CreateRoleRequest;
import com.university.eventmanagement.dto.role.RoleDto;
import com.university.eventmanagement.dto.user.UserDto;
import com.university.eventmanagement.service.RoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleDto>>> getAllRoles() {
        return ResponseEntity.ok(ApiResponse.success(roleService.getAllRoles()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleDto>> getRoleById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(roleService.getRoleById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoleDto>> createRole(@Valid @RequestBody CreateRoleRequest request) {
        RoleDto created = roleService.createRole(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Role created", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoleDto>> updateRole(
            @PathVariable String id,
            @Valid @RequestBody CreateRoleRequest request) {
        RoleDto updated = roleService.updateRole(id, request);
        return ResponseEntity.ok(ApiResponse.success("Role updated", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable String id) {
        roleService.deleteRole(id);
        return ResponseEntity.ok(ApiResponse.success("Role deleted", null));
    }

    @PostMapping("/assign/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> assignRolesToUser(
            @PathVariable String userId,
            @RequestBody List<String> roles) {
        UserDto updatedUser = roleService.assignRoleToUser(userId, roles);
        return ResponseEntity.ok(ApiResponse.success("Roles assigned successfully", updatedUser));
    }
}
