package com.university.eventmanagement.dto.venue;

import com.university.eventmanagement.entity.enums.VenueStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VenueDto {
    private String id;

    @NotBlank(message = "Venue name is required")
    private String name;

    @NotBlank(message = "Venue code is required")
    private String code;

    @NotBlank(message = "Building is required")
    private String building;

    private String floor;

    @Min(value = 1, message = "Capacity must be at least 1")
    private int capacity;

    private String description;
    private List<String> facilities;
    private List<String> images;
    private VenueStatus status;
    private String maintenanceNotes;
    private Instant createdAt;
    private Instant updatedAt;
}
