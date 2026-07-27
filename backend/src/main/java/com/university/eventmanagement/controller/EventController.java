package com.university.eventmanagement.controller;

import com.university.eventmanagement.dto.common.ApiResponse;
import com.university.eventmanagement.dto.common.PagedResponse;
import com.university.eventmanagement.dto.event.*;
import com.university.eventmanagement.entity.EventVersion;
import com.university.eventmanagement.entity.enums.EventStatus;
import com.university.eventmanagement.service.ConflictDetectionService;
import com.university.eventmanagement.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final ConflictDetectionService conflictDetectionService;

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<EventDto>>> searchEvents(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String venueId,
            @RequestParam(required = false) EventStatus status,
            @RequestParam(required = false) Boolean isFeatured,
            @RequestParam(required = false) Boolean isFree,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "startDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        PagedResponse<EventDto> result = eventService.searchEvents(query, categoryId, venueId, status, isFeatured, isFree, page, size, sortBy, sortDir);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<EventDto>>> getFeaturedEvents() {
        return ResponseEntity.ok(ApiResponse.success(eventService.getFeaturedEvents()));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<ApiResponse<List<EventDto>>> getUpcomingEvents() {
        return ResponseEntity.ok(ApiResponse.success(eventService.getUpcomingEvents()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventDto>> getEventById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(eventService.getEventById(id)));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ApiResponse<EventDto>> getEventByCode(@PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.success(eventService.getEventByCode(code)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EVENT_COORDINATOR', 'CLUB_PRESIDENT')")
    public ResponseEntity<ApiResponse<EventDto>> createEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateEventRequest request) {
        EventDto created = eventService.createEvent(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Event created successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EVENT_COORDINATOR', 'CLUB_PRESIDENT', 'FACULTY_ADMINISTRATOR')")
    public ResponseEntity<ApiResponse<EventDto>> updateEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id,
            @RequestBody UpdateEventRequest request) {
        EventDto updated = eventService.updateEvent(id, request, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Event updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EVENT_COORDINATOR')")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(
            @PathVariable String id,
            @RequestParam(defaultValue = "false") boolean permanent) {
        eventService.deleteEvent(id, permanent);
        return ResponseEntity.ok(ApiResponse.success(permanent ? "Event permanently deleted" : "Event archived (soft deleted)", null));
    }

    @PostMapping("/check-venue-conflict")
    public ResponseEntity<ApiResponse<VenueConflictResponse>> checkVenueConflict(@Valid @RequestBody VenueConflictCheckRequest request) {
        VenueConflictResponse response = conflictDetectionService.checkVenueConflict(
                request.getVenueId(), request.getStartDate(), request.getEndDate(), request.getExcludeEventId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}/versions")
    public ResponseEntity<ApiResponse<List<EventVersion>>> getEventVersionHistory(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(eventService.getEventVersionHistory(id)));
    }

    @PostMapping("/{id}/submit-approval")
    @PreAuthorize("hasAnyRole('ADMIN', 'EVENT_COORDINATOR', 'CLUB_PRESIDENT')")
    public ResponseEntity<ApiResponse<EventDto>> submitForApproval(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id) {
        EventDto updated = eventService.submitEventForApproval(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Event submitted for multi-level approval", updated));
    }
}
