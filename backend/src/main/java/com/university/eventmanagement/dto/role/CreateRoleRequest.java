package com.university.eventmanagement.dto.role;

import com.university.eventmanagement.entity.enums.RoleName;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class CreateRoleRequest {
    @NotNull(message = "Role name is required")
    private RoleName name;
    private String displayName;
    private String description;
    private Set<String> permissions;
}
