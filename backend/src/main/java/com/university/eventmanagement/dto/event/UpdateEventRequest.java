package com.university.eventmanagement.dto.event;

import com.university.eventmanagement.entity.enums.EventStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
public class UpdateEventRequest {
    private String title;
    private String description;
    private String categoryId;
    private String venueId;
    private Instant startDate;
    private Instant endDate;
    private Instant registrationDeadline;
    private Integer capacity;
    private Boolean isFree;
    private BigDecimal price;
    private Boolean isFeatured;
    private EventStatus status;
    private String bannerUrl;
    private List<String> galleryUrls;
    private List<String> tags;
    private String changeReason;
}
