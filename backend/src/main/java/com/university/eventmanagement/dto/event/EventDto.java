package com.university.eventmanagement.dto.event;

import com.university.eventmanagement.entity.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {
    private String id;
    private String eventCode;
    private String title;
    private String description;
    private String categoryId;
    private String categoryName;
    private String venueId;
    private String venueName;
    private String organizerId;
    private String organizerName;

    private Instant startDate;
    private Instant endDate;
    private Instant registrationDeadline;

    private int capacity;
    private int registeredCount;
    private int remainingSeats;

    private boolean isFree;
    private BigDecimal price;

    private boolean isFeatured;
    private EventStatus status;

    private String bannerUrl;
    private List<String> galleryUrls;
    private List<String> tags;
    private boolean archived;
    private int version;

    private Instant createdAt;
    private Instant updatedAt;
}
