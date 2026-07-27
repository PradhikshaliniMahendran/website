package com.university.eventmanagement.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventStatsDto {
    private long totalEvents;
    private long draftEvents;
    private long pendingEvents;
    private long publishedEvents;
    private long completedEvents;
    private long cancelledEvents;
    private long featuredEvents;
}
