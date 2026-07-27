package com.university.eventmanagement.dto.approval;

import com.university.eventmanagement.entity.enums.ApprovalStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ApprovalActionRequest {
    @NotNull(message = "Action is required")
    private ApprovalStatus action; // APPROVED, REJECTED, CHANGES_REQUESTED
    private String comments;
    private String requestedChanges;
}
