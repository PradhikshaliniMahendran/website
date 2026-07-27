package com.university.eventmanagement.dto.event;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;

@Data
public class VenueConflictCheckRequest {
    @NotBlank(message = "Venue ID is required")
    private String venueId;

    @NotNull(message = "Start date is required")
    private Instant startDate;

    @NotNull(message = "End date is required")
    private Instant endDate;

    private String excludeEventId;
}
