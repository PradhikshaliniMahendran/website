package com.university.eventmanagement.entity;

import com.university.eventmanagement.entity.enums.ApprovalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "approval_logs")
public class ApprovalLog {
    @Id
    private String id;
    private String approvalRequestId;
    private String eventId;
    private String actionByUserId;
    private String actionByUserName;
    private String actionByUserRole;
    private ApprovalStatus action; // APPROVED, REJECTED, CHANGES_REQUESTED, SUBMITTED
    private int level;
    private String comment;

    @CreatedDate
    private Instant timestamp;
}
