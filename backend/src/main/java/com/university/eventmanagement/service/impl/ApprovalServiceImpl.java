package com.university.eventmanagement.service.impl;

import com.university.eventmanagement.dto.approval.ApprovalActionRequest;
import com.university.eventmanagement.dto.approval.ApprovalLogDto;
import com.university.eventmanagement.dto.approval.ApprovalRequestDto;
import com.university.eventmanagement.dto.common.PagedResponse;
import com.university.eventmanagement.dto.event.EventDto;
import com.university.eventmanagement.entity.ApprovalLog;
import com.university.eventmanagement.entity.ApprovalRequest;
import com.university.eventmanagement.entity.Event;
import com.university.eventmanagement.entity.User;
import com.university.eventmanagement.entity.enums.ApprovalStatus;
import com.university.eventmanagement.entity.enums.EventStatus;
import com.university.eventmanagement.exception.BadRequestException;
import com.university.eventmanagement.exception.ResourceNotFoundException;
import com.university.eventmanagement.repository.ApprovalLogRepository;
import com.university.eventmanagement.repository.ApprovalRequestRepository;
import com.university.eventmanagement.repository.EventRepository;
import com.university.eventmanagement.repository.UserRepository;
import com.university.eventmanagement.service.ApprovalService;
import com.university.eventmanagement.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {

    private final ApprovalRequestRepository approvalRequestRepository;
    private final ApprovalLogRepository approvalLogRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventService eventService;

    @Override
    public PagedResponse<ApprovalRequestDto> getApprovalRequests(ApprovalStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("updatedAt").descending());
        Page<ApprovalRequest> requestsPage;

        if (status != null) {
            requestsPage = approvalRequestRepository.findByStatus(status, pageable);
        } else {
            requestsPage = approvalRequestRepository.findAll(pageable);
        }

        List<ApprovalRequestDto> content = requestsPage.getContent().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return PagedResponse.<ApprovalRequestDto>builder()
                .content(content)
                .page(requestsPage.getNumber())
                .size(requestsPage.getSize())
                .totalElements(requestsPage.getTotalElements())
                .totalPages(requestsPage.getTotalPages())
                .last(requestsPage.isLast())
                .build();
    }

    @Override
    public ApprovalRequestDto getApprovalRequestById(String id) {
        ApprovalRequest request = approvalRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Approval request not found with id: " + id));
        return mapToDto(request);
    }

    @Override
    public ApprovalRequestDto getApprovalRequestByEventId(String eventId) {
        ApprovalRequest request = approvalRequestRepository.findByEventId(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval request not found for event id: " + eventId));
        return mapToDto(request);
    }

    @Override
    public ApprovalRequestDto processApprovalAction(String approvalRequestId, ApprovalActionRequest actionRequest, String reviewerUsername) {
        ApprovalRequest request = approvalRequestRepository.findById(approvalRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval request not found with id: " + approvalRequestId));

        User reviewer = userRepository.findByUsername(reviewerUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + reviewerUsername));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + request.getEventId()));

        ApprovalStatus action = actionRequest.getAction();
        String primaryRole = reviewer.getRoles().isEmpty() ? "REVIEWER" : reviewer.getRoles().iterator().next();

        if (action == ApprovalStatus.APPROVED) {
            if (request.getCurrentLevel() == 1) {
                // Move to Level 2 (Student Affairs Manager)
                request.setCurrentLevel(2);
                request.setStatus(ApprovalStatus.PENDING);
            } else {
                // Level 2 Approved -> Final Approval
                request.setStatus(ApprovalStatus.APPROVED);
                event.setStatus(EventStatus.PUBLISHED);
                eventRepository.save(event);
            }
        } else if (action == ApprovalStatus.REJECTED) {
            request.setStatus(ApprovalStatus.REJECTED);
            request.setComments(actionRequest.getComments());
            event.setStatus(EventStatus.CANCELLED);
            eventRepository.save(event);
        } else if (action == ApprovalStatus.CHANGES_REQUESTED) {
            request.setStatus(ApprovalStatus.CHANGES_REQUESTED);
            request.setRequestedChanges(actionRequest.getRequestedChanges());
            event.setStatus(EventStatus.DRAFT);
            eventRepository.save(event);
        }

        ApprovalRequest updatedRequest = approvalRequestRepository.save(request);

        // Record Audit Log
        ApprovalLog log = ApprovalLog.builder()
                .approvalRequestId(request.getId())
                .eventId(event.getId())
                .actionByUserId(reviewer.getId())
                .actionByUserName(reviewer.getFullName())
                .actionByUserRole(primaryRole)
                .action(action)
                .level(request.getCurrentLevel())
                .comment(actionRequest.getComments() != null ? actionRequest.getComments() : actionRequest.getRequestedChanges())
                .timestamp(Instant.now())
                .build();
        approvalLogRepository.save(log);

        return mapToDto(updatedRequest);
    }

    @Override
    public List<ApprovalLogDto> getAuditTrailForRequest(String approvalRequestId) {
        return approvalLogRepository.findByApprovalRequestIdOrderByTimestampDesc(approvalRequestId).stream()
                .map(this::mapLogToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ApprovalLogDto> getAuditTrailForEvent(String eventId) {
        return approvalLogRepository.findByEventIdOrderByTimestampDesc(eventId).stream()
                .map(this::mapLogToDto)
                .collect(Collectors.toList());
    }

    private ApprovalRequestDto mapToDto(ApprovalRequest request) {
        EventDto eventDto = eventService.getEventById(request.getEventId());
        String requesterName = userRepository.findById(request.getRequesterId())
                .map(User::getFullName).orElse("Unknown User");

        List<ApprovalLogDto> logs = getAuditTrailForRequest(request.getId());

        return ApprovalRequestDto.builder()
                .id(request.getId())
                .eventId(request.getEventId())
                .event(eventDto)
                .requesterId(request.getRequesterId())
                .requesterName(requesterName)
                .currentLevel(request.getCurrentLevel())
                .status(request.getStatus())
                .comments(request.getComments())
                .requestedChanges(request.getRequestedChanges())
                .auditTrail(logs)
                .createdAt(request.getCreatedAt())
                .updatedAt(request.getUpdatedAt())
                .build();
    }

    private ApprovalLogDto mapLogToDto(ApprovalLog log) {
        return ApprovalLogDto.builder()
                .id(log.getId())
                .approvalRequestId(log.getApprovalRequestId())
                .eventId(log.getEventId())
                .actionByUserId(log.getActionByUserId())
                .actionByUserName(log.getActionByUserName())
                .actionByUserRole(log.getActionByUserRole())
                .action(log.getAction())
                .level(log.getLevel())
                .comment(log.getComment())
                .timestamp(log.getTimestamp())
                .build();
    }
}
