package com.university.eventmanagement.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.university.eventmanagement.dto.common.PagedResponse;
import com.university.eventmanagement.dto.event.CreateEventRequest;
import com.university.eventmanagement.dto.event.EventDto;
import com.university.eventmanagement.dto.event.UpdateEventRequest;
import com.university.eventmanagement.dto.event.VenueConflictResponse;
import com.university.eventmanagement.entity.*;
import com.university.eventmanagement.entity.enums.ApprovalStatus;
import com.university.eventmanagement.entity.enums.EventStatus;
import com.university.eventmanagement.exception.BadRequestException;
import com.university.eventmanagement.exception.DuplicateEventException;
import com.university.eventmanagement.exception.ResourceNotFoundException;
import com.university.eventmanagement.exception.VenueConflictException;
import com.university.eventmanagement.repository.*;
import com.university.eventmanagement.service.ConflictDetectionService;
import com.university.eventmanagement.service.EventService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final CategoryRepository categoryRepository;
    private final VenueRepository venueRepository;
    private final UserRepository userRepository;
    private final EventVersionRepository eventVersionRepository;
    private final ApprovalRequestRepository approvalRequestRepository;
    private final ConflictDetectionService conflictDetectionService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public EventDto createEvent(CreateEventRequest request, String organizerUsername) {
        User organizer = userRepository.findByUsername(organizerUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + organizerUsername));

        // 1. Check duplicate event
        if (conflictDetectionService.checkDuplicateEvent(request.getTitle(), request.getStartDate(), null)) {
            throw new DuplicateEventException("A similar event with title '" + request.getTitle() + "' already exists around this date!");
        }

        // 2. Check venue conflict
        VenueConflictResponse conflictResponse = conflictDetectionService.checkVenueConflict(
                request.getVenueId(), request.getStartDate(), request.getEndDate(), null);
        if (conflictResponse.isHasConflict()) {
            throw new VenueConflictException(conflictResponse.getMessage());
        }

        // 3. Generate Unique Event Code
        String eventCode = generateUniqueEventCode();

        Event event = Event.builder()
                .eventCode(eventCode)
                .title(request.getTitle())
                .description(request.getDescription())
                .categoryId(request.getCategoryId())
                .venueId(request.getVenueId())
                .organizerId(organizer.getId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .registrationDeadline(request.getRegistrationDeadline() != null ? request.getRegistrationDeadline() : request.getStartDate())
                .capacity(request.getCapacity())
                .registeredCount(0)
                .isFree(request.isFree())
                .price(request.getPrice())
                .isFeatured(request.isFeatured())
                .status(EventStatus.DRAFT)
                .bannerUrl(request.getBannerUrl())
                .galleryUrls(request.getGalleryUrls() != null ? request.getGalleryUrls() : new ArrayList<>())
                .tags(request.getTags() != null ? request.getTags() : new ArrayList<>())
                .archived(false)
                .version(1)
                .templateId(request.getTemplateId())
                .build();

        Event savedEvent = eventRepository.save(event);

        // Record version 1 snapshot
        recordVersionSnapshot(savedEvent, "Initial Creation", organizer.getId());

        return mapToDto(savedEvent);
    }

    @Override
    public EventDto updateEvent(String id, UpdateEventRequest request, String modifiedByUsername) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        User modifier = userRepository.findByUsername(modifiedByUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + modifiedByUsername));

        String targetVenueId = request.getVenueId() != null ? request.getVenueId() : event.getVenueId();
        Instant targetStart = request.getStartDate() != null ? request.getStartDate() : event.getStartDate();
        Instant targetEnd = request.getEndDate() != null ? request.getEndDate() : event.getEndDate();

        // Re-validate venue conflict if dates or venue changed
        if (!targetVenueId.equals(event.getVenueId()) || !targetStart.equals(event.getStartDate()) || !targetEnd.equals(event.getEndDate())) {
            VenueConflictResponse conflictResponse = conflictDetectionService.checkVenueConflict(
                    targetVenueId, targetStart, targetEnd, event.getId());
            if (conflictResponse.isHasConflict()) {
                throw new VenueConflictException(conflictResponse.getMessage());
            }
        }

        if (request.getTitle() != null) event.setTitle(request.getTitle());
        if (request.getDescription() != null) event.setDescription(request.getDescription());
        if (request.getCategoryId() != null) event.setCategoryId(request.getCategoryId());
        if (request.getVenueId() != null) event.setVenueId(request.getVenueId());
        if (request.getStartDate() != null) event.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) event.setEndDate(request.getEndDate());
        if (request.getRegistrationDeadline() != null) event.setRegistrationDeadline(request.getRegistrationDeadline());
        if (request.getCapacity() != null) event.setCapacity(request.getCapacity());
        if (request.getIsFree() != null) event.setFree(request.getIsFree());
        if (request.getPrice() != null) event.setPrice(request.getPrice());
        if (request.getIsFeatured() != null) event.setFeatured(request.getIsFeatured());
        if (request.getStatus() != null) event.setStatus(request.getStatus());
        if (request.getBannerUrl() != null) event.setBannerUrl(request.getBannerUrl());
        if (request.getGalleryUrls() != null) event.setGalleryUrls(request.getGalleryUrls());
        if (request.getTags() != null) event.setTags(request.getTags());

        event.setVersion(event.getVersion() + 1);
        Event updatedEvent = eventRepository.save(event);

        String summary = request.getChangeReason() != null ? request.getChangeReason() : "Updated event details";
        recordVersionSnapshot(updatedEvent, summary, modifier.getId());

        return mapToDto(updatedEvent);
    }

    @Override
    public void deleteEvent(String id, boolean permanent) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        if (permanent) {
            eventRepository.deleteById(id);
        } else {
            event.setArchived(true);
            eventRepository.save(event);
        }
    }

    @Override
    public EventDto getEventById(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return mapToDto(event);
    }

    @Override
    public EventDto getEventByCode(String code) {
        Event event = eventRepository.findByEventCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with code: " + code));
        return mapToDto(event);
    }

    @Override
    public PagedResponse<EventDto> searchEvents(String query, String categoryId, String venueId, EventStatus status, Boolean isFeatured, Boolean isFree, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Event> eventPage = eventRepository.findByArchivedFalse(pageable); // Can be enriched with custom Criteria query if needed

        List<EventDto> content = eventPage.getContent().stream()
                .filter(e -> query == null || e.getTitle().toLowerCase().contains(query.toLowerCase()) || e.getDescription().toLowerCase().contains(query.toLowerCase()))
                .filter(e -> categoryId == null || categoryId.equals(e.getCategoryId()))
                .filter(e -> venueId == null || venueId.equals(e.getVenueId()))
                .filter(e -> status == null || status.equals(e.getStatus()))
                .filter(e -> isFeatured == null || e.isFeatured() == isFeatured)
                .filter(e -> isFree == null || e.isFree() == isFree)
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return PagedResponse.<EventDto>builder()
                .content(content)
                .page(eventPage.getNumber())
                .size(eventPage.getSize())
                .totalElements(content.size())
                .totalPages(eventPage.getTotalPages())
                .last(eventPage.isLast())
                .build();
    }

    @Override
    public List<EventDto> getFeaturedEvents() {
        return eventRepository.findByIsFeaturedTrueAndArchivedFalse(PageRequest.of(0, 10)).getContent().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventDto> getUpcomingEvents() {
        return eventRepository.findByStartDateAfterAndArchivedFalseOrderByStartDateAsc(Instant.now()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventVersion> getEventVersionHistory(String eventId) {
        return eventVersionRepository.findByEventIdOrderByVersionNumberDesc(eventId);
    }

    @Override
    public EventDto submitEventForApproval(String eventId, String requesterUsername) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        User requester = userRepository.findByUsername(requesterUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + requesterUsername));

        event.setStatus(EventStatus.PENDING_APPROVAL);
        Event updated = eventRepository.save(event);

        ApprovalRequest approvalRequest = approvalRequestRepository.findByEventId(eventId)
                .orElse(ApprovalRequest.builder()
                        .eventId(eventId)
                        .requesterId(requester.getId())
                        .currentLevel(1)
                        .status(ApprovalStatus.PENDING)
                        .build());

        approvalRequest.setStatus(ApprovalStatus.PENDING);
        approvalRequest.setCurrentLevel(1);
        approvalRequestRepository.save(approvalRequest);

        return mapToDto(updated);
    }

    private String generateUniqueEventCode() {
        int year = Year.now().getValue();
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder("EVT-").append(year).append("-");
        for (int i = 0; i < 4; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    @SneakyThrows
    private void recordVersionSnapshot(Event event, String summary, String userId) {
        String json = objectMapper.writeValueAsString(event);
        EventVersion version = EventVersion.builder()
                .eventId(event.getId())
                .versionNumber(event.getVersion())
                .changeSummary(summary)
                .modifiedByUserId(userId)
                .snapshotJson(json)
                .build();
        eventVersionRepository.save(version);
    }

    private EventDto mapToDto(Event event) {
        String categoryName = event.getCategoryId() != null ? categoryRepository.findById(event.getCategoryId()).map(Category::getName).orElse("General") : "Uncategorized";
        String venueName = event.getVenueId() != null ? venueRepository.findById(event.getVenueId()).map(Venue::getName).orElse("TBD") : "TBD";
        String organizerName = event.getOrganizerId() != null ? userRepository.findById(event.getOrganizerId()).map(User::getFullName).orElse("University Admin") : "University Admin";

        int remaining = Math.max(0, event.getCapacity() - event.getRegisteredCount());

        return EventDto.builder()
                .id(event.getId())
                .eventCode(event.getEventCode())
                .title(event.getTitle())
                .description(event.getDescription())
                .categoryId(event.getCategoryId())
                .categoryName(categoryName)
                .venueId(event.getVenueId())
                .venueName(venueName)
                .organizerId(event.getOrganizerId())
                .organizerName(organizerName)
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .registrationDeadline(event.getRegistrationDeadline())
                .capacity(event.getCapacity())
                .registeredCount(event.getRegisteredCount())
                .remainingSeats(remaining)
                .isFree(event.isFree())
                .price(event.getPrice())
                .isFeatured(event.isFeatured())
                .status(event.getStatus())
                .bannerUrl(event.getBannerUrl())
                .galleryUrls(event.getGalleryUrls())
                .tags(event.getTags())
                .archived(event.isArchived())
                .version(event.getVersion())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }
}
