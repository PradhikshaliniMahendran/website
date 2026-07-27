package com.university.eventmanagement.entity;

import com.university.eventmanagement.entity.enums.ApprovalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "approval_requests")
public class ApprovalRequest {
    @Id
    private String id;
    private String eventId;
    private String requesterId; // User ID submitting approval
    
    @Builder.Default
    private int currentLevel = 1; // Multi-level: Level 1 (Coordinator/Faculty), Level 2 (Student Affairs Manager)

    @Builder.Default
    private ApprovalStatus status = ApprovalStatus.PENDING;

    private String comments;
    private String requestedChanges;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
