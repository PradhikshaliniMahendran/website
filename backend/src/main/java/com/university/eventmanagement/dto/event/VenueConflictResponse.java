package com.university.eventmanagement.dto.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VenueConflictResponse {
    private boolean hasConflict;
    private String message;
    private List<EventDto> conflictingEvents;
}
