package com.university.eventmanagement.service;

import com.university.eventmanagement.dto.approval.ApprovalActionRequest;
import com.university.eventmanagement.dto.approval.ApprovalLogDto;
import com.university.eventmanagement.dto.approval.ApprovalRequestDto;
import com.university.eventmanagement.dto.common.PagedResponse;
import com.university.eventmanagement.entity.enums.ApprovalStatus;

import java.util.List;

public interface ApprovalService {
    PagedResponse<ApprovalRequestDto> getApprovalRequests(ApprovalStatus status, int page, int size);
    ApprovalRequestDto getApprovalRequestById(String id);
    ApprovalRequestDto getApprovalRequestByEventId(String eventId);
    ApprovalRequestDto processApprovalAction(String approvalRequestId, ApprovalActionRequest actionRequest, String reviewerUsername);
    List<ApprovalLogDto> getAuditTrailForRequest(String approvalRequestId);
    List<ApprovalLogDto> getAuditTrailForEvent(String eventId);
}
