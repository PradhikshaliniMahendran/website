package com.university.eventmanagement.service.impl;

import com.university.eventmanagement.dto.role.CreateRoleRequest;
import com.university.eventmanagement.dto.role.RoleDto;
import com.university.eventmanagement.dto.user.UserDto;
import com.university.eventmanagement.entity.Role;
import com.university.eventmanagement.entity.User;
import com.university.eventmanagement.exception.BadRequestException;
import com.university.eventmanagement.exception.ResourceNotFoundException;
import com.university.eventmanagement.repository.RoleRepository;
import com.university.eventmanagement.repository.UserRepository;
import com.university.eventmanagement.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<RoleDto> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public RoleDto getRoleById(String id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
        return mapToDto(role);
    }

    @Override
    public RoleDto createRole(CreateRoleRequest request) {
        if (roleRepository.existsByName(request.getName())) {
            throw new BadRequestException("Role already exists: " + request.getName());
        }

        Role role = Role.builder()
                .name(request.getName())
                .displayName(request.getDisplayName() != null ? request.getDisplayName() : request.getName().name())
                .description(request.getDescription())
                .permissions(request.getPermissions() != null ? request.getPermissions() : new HashSet<>())
                .build();

        Role saved = roleRepository.save(role);
        return mapToDto(saved);
    }

    @Override
    public RoleDto updateRole(String id, CreateRoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));

        role.setDisplayName(request.getDisplayName());
        role.setDescription(request.getDescription());
        if (request.getPermissions() != null) {
            role.setPermissions(request.getPermissions());
        }

        Role updated = roleRepository.save(role);
        return mapToDto(updated);
    }

    @Override
    public void deleteRole(String id) {
        if (!roleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Role not found with id: " + id);
        }
        roleRepository.deleteById(id);
    }

    @Override
    public UserDto assignRoleToUser(String userId, List<String> roles) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setRoles(new HashSet<>(roles));
        User updated = userRepository.save(user);

        return UserDto.builder()
                .id(updated.getId())
                .username(updated.getUsername())
                .email(updated.getEmail())
                .fullName(updated.getFullName())
                .avatarUrl(updated.getAvatarUrl())
                .phone(updated.getPhone())
                .department(updated.getDepartment())
                .studentId(updated.getStudentId())
                .active(updated.isActive())
                .roles(updated.getRoles())
                .createdAt(updated.getCreatedAt())
                .updatedAt(updated.getUpdatedAt())
                .build();
    }

    private RoleDto mapToDto(Role role) {
        return RoleDto.builder()
                .id(role.getId())
                .name(role.getName())
                .displayName(role.getDisplayName())
                .description(role.getDescription())
                .permissions(role.getPermissions())
                .build();
    }
}
