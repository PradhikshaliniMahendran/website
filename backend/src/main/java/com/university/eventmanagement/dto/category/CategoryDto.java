package com.university.eventmanagement.dto.category;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private String id;

    @NotBlank(message = "Category name is required")
    private String name;

    private String slug;
    private String description;
    private String iconName;
    private String badgeColor;
    private String imageUrl;
    private Instant createdAt;
}
