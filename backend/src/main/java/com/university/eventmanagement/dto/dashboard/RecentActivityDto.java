package com.university.eventmanagement.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivityDto {
    private String id;
    private String title;
    private String description;
    private String type; // USER_REGISTERED, EVENT_CREATED, APPROVAL_SUBMITTED, VENUE_ADDED
    private String actorName;
    private Instant timestamp;
}
