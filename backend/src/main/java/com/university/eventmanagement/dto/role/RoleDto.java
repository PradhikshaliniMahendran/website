package com.university.eventmanagement.dto.role;

import com.university.eventmanagement.entity.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private String id;
    private RoleName name;
    private String displayName;
    private String description;
    private Set<String> permissions;
}
