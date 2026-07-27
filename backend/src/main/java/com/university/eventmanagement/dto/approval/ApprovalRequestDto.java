package com.university.eventmanagement.dto.approval;

import com.university.eventmanagement.dto.event.EventDto;
import com.university.eventmanagement.entity.enums.ApprovalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalRequestDto {
    private String id;
    private String eventId;
    private EventDto event;
    private String requesterId;
    private String requesterName;
    private int currentLevel;
    private ApprovalStatus status;
    private String comments;
    private String requestedChanges;
    private List<ApprovalLogDto> auditTrail;
    private Instant createdAt;
    private Instant updatedAt;
}
