package com.university.eventmanagement.dto.approval;

import com.university.eventmanagement.entity.enums.ApprovalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalLogDto {
    private String id;
    private String approvalRequestId;
    private String eventId;
    private String actionByUserId;
    private String actionByUserName;
    private String actionByUserRole;
    private ApprovalStatus action;
    private int level;
    private String comment;
    private Instant timestamp;
}
