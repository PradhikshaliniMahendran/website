package com.university.eventmanagement.service;

import com.university.eventmanagement.dto.common.PagedResponse;
import com.university.eventmanagement.dto.event.CreateEventRequest;
import com.university.eventmanagement.dto.event.EventDto;
import com.university.eventmanagement.dto.event.UpdateEventRequest;
import com.university.eventmanagement.entity.EventVersion;
import com.university.eventmanagement.entity.enums.EventStatus;

import java.util.List;

public interface EventService {
    EventDto createEvent(CreateEventRequest request, String organizerUsername);
    EventDto updateEvent(String id, UpdateEventRequest request, String modifiedByUsername);
    void deleteEvent(String id, boolean permanent);
    EventDto getEventById(String id);
    EventDto getEventByCode(String code);
    PagedResponse<EventDto> searchEvents(String query, String categoryId, String venueId, EventStatus status, Boolean isFeatured, Boolean isFree, int page, int size, String sortBy, String sortDir);
    List<EventDto> getFeaturedEvents();
    List<EventDto> getUpcomingEvents();
    List<EventVersion> getEventVersionHistory(String eventId);
    EventDto submitEventForApproval(String eventId, String requesterUsername);
}
