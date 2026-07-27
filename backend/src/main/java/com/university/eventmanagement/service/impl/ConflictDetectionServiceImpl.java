package com.university.eventmanagement.service.impl;

import com.university.eventmanagement.dto.event.EventDto;
import com.university.eventmanagement.dto.event.VenueConflictResponse;
import com.university.eventmanagement.entity.Event;
import com.university.eventmanagement.repository.EventRepository;
import com.university.eventmanagement.service.ConflictDetectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConflictDetectionServiceImpl implements ConflictDetectionService {

    private final EventRepository eventRepository;

    @Override
    public VenueConflictResponse checkVenueConflict(String venueId, Instant startDate, Instant endDate, String excludeEventId) {
        List<Event> conflicts;
        if (excludeEventId != null && !excludeEventId.trim().isEmpty()) {
            conflicts = eventRepository.findConflictingEventsExcludingId(venueId, startDate, endDate, excludeEventId);
        } else {
            conflicts = eventRepository.findConflictingEvents(venueId, startDate, endDate);
        }

        boolean hasConflict = !conflicts.isEmpty();
        String message = hasConflict 
                ? "Venue conflict detected! There are " + conflicts.size() + " overlapping event(s) booked for this time window." 
                : "No venue conflicts detected. Venue is available.";

        List<EventDto> conflictDtos = conflicts.stream()
                .map(event -> EventDto.builder()
                        .id(event.getId())
                        .eventCode(event.getEventCode())
                        .title(event.getTitle())
                        .startDate(event.getStartDate())
                        .endDate(event.getEndDate())
                        .venueId(event.getVenueId())
                        .status(event.getStatus())
                        .build())
                .collect(Collectors.toList());

        return VenueConflictResponse.builder()
                .hasConflict(hasConflict)
                .message(message)
                .conflictingEvents(conflictDtos)
                .build();
    }

    @Override
    public boolean checkDuplicateEvent(String title, Instant startDate, String excludeEventId) {
        Instant windowStart = startDate.minus(24, ChronoUnit.HOURS);
        Instant windowEnd = startDate.plus(24, ChronoUnit.HOURS);

        List<Event> matches = eventRepository.findByTitleIgnoreCaseAndStartDateBetween(title, windowStart, windowEnd);

        if (excludeEventId != null && !excludeEventId.trim().isEmpty()) {
            matches = matches.stream()
                    .filter(e -> !e.getId().equals(excludeEventId))
                    .collect(Collectors.toList());
        }

        return !matches.isEmpty();
    }
}
