package com.university.eventmanagement.entity;

import com.university.eventmanagement.entity.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "roles")
public class Role {
    @Id
    private String id;

    @Indexed(unique = true)
    private RoleName name;

    private String displayName;
    private String description;

    @Builder.Default
    private Set<String> permissions = new HashSet<>();
}
