package com.university.eventmanagement.dto.venue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeSlotDto {
    private String slotId;
    private Instant startTime;
    private Instant endTime;
    private boolean available;
    private String reservedByEventId;
    private String reservedByEventTitle;
}
