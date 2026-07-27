package com.university.eventmanagement.controller;

import com.university.eventmanagement.dto.approval.ApprovalActionRequest;
import com.university.eventmanagement.dto.approval.ApprovalLogDto;
import com.university.eventmanagement.dto.approval.ApprovalRequestDto;
import com.university.eventmanagement.dto.common.ApiResponse;
import com.university.eventmanagement.dto.common.PagedResponse;
import com.university.eventmanagement.entity.enums.ApprovalStatus;
import com.university.eventmanagement.service.ApprovalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/approvals")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'FACULTY_ADMINISTRATOR', 'STUDENT_AFFAIRS_MANAGER', 'EVENT_COORDINATOR')")
public class ApprovalController {

    private final ApprovalService approvalService;

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<ApprovalRequestDto>>> getApprovalRequests(
            @RequestParam(required = false) ApprovalStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PagedResponse<ApprovalRequestDto> response = approvalService.getApprovalRequests(status, page, size);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ApprovalRequestDto>> getApprovalRequestById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(approvalService.getApprovalRequestById(id)));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<ApiResponse<ApprovalRequestDto>> getApprovalRequestByEventId(@PathVariable String eventId) {
        return ResponseEntity.ok(ApiResponse.success(approvalService.getApprovalRequestByEventId(eventId)));
    }

    @PostMapping("/{id}/action")
    public ResponseEntity<ApiResponse<ApprovalRequestDto>> processApprovalAction(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id,
            @Valid @RequestBody ApprovalActionRequest actionRequest) {
        ApprovalRequestDto updated = approvalService.processApprovalAction(id, actionRequest, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Approval action recorded", updated));
    }

    @GetMapping("/{id}/audit-trail")
    public ResponseEntity<ApiResponse<List<ApprovalLogDto>>> getAuditTrailForRequest(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(approvalService.getAuditTrailForRequest(id)));
    }
}
