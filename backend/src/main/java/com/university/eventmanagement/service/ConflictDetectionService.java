package com.university.eventmanagement.service;

import com.university.eventmanagement.dto.event.EventDto;
import com.university.eventmanagement.dto.event.VenueConflictResponse;

import java.time.Instant;
import java.util.List;

public interface ConflictDetectionService {
    VenueConflictResponse checkVenueConflict(String venueId, Instant startDate, Instant endDate, String excludeEventId);
    boolean checkDuplicateEvent(String title, Instant startDate, String excludeEventId);
}
