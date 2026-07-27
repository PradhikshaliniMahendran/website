package com.campusconnect.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private String title;

    private String description;

    private String category; // ACADEMIC, CULTURAL, SPORTS, WORKSHOP, SEMINAR, SOCIAL

    private String organizerId;

    private String organizerName;

    private String clubId;

    private String venueId;

    private String venueName;

    private String venueLocation;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private List<String> tags;

    private String banner;

    private Integer capacity;

    @Builder.Default
    private Integer registeredCount = 0;

    private String status; // DRAFT, PENDING, APPROVED, REJECTED, ONGOING, COMPLETED, CANCELLED

    private ApprovalInfo approval;

    private Boolean isFeatured;

    private Boolean waitlistEnabled;

    private LocalDateTime registrationDeadline;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ApprovalInfo {
        private String status;
        private String comments;
        private String reviewedBy;
        private LocalDateTime reviewedAt;
    }
}
