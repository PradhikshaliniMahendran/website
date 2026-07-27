package com.university.eventmanagement.entity;

import com.university.eventmanagement.entity.enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "events")
public class Event {
    @Id
    private String id;

    @Indexed(unique = true)
    private String eventCode; // Auto-generated EVT-YYYY-XXXX

    private String title;
    private String description;
    private String categoryId;
    private String venueId;
    private String organizerId; // User ID of creator / organizer

    private Instant startDate;
    private Instant endDate;
    private Instant registrationDeadline;

    private int capacity;

    @Builder.Default
    private int registeredCount = 0;

    @Builder.Default
    private boolean isFree = true;

    private BigDecimal price;

    @Builder.Default
    private boolean isFeatured = false;

    @Builder.Default
    private EventStatus status = EventStatus.DRAFT;

    private String bannerUrl;

    @Builder.Default
    private List<String> galleryUrls = new ArrayList<>();

    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @Builder.Default
    private boolean archived = false;

    @Builder.Default
    private int version = 1;

    private String templateId;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
