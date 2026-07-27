package com.university.eventmanagement.dto.event;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
public class CreateEventRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String categoryId;

    @NotBlank(message = "Venue is required")
    private String venueId;

    @NotNull(message = "Start date is required")
    private Instant startDate;

    @NotNull(message = "End date is required")
    private Instant endDate;

    private Instant registrationDeadline;

    @Min(value = 1, message = "Capacity must be at least 1")
    private int capacity;

    private boolean isFree = true;
    private BigDecimal price;

    private boolean isFeatured = false;
    private String bannerUrl;
    private List<String> galleryUrls;
    private List<String> tags;
    private String templateId;
}
