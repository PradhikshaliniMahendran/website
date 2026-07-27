package com.university.eventmanagement.repository;

import com.university.eventmanagement.entity.ApprovalLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApprovalLogRepository extends MongoRepository<ApprovalLog, String> {
    List<ApprovalLog> findByApprovalRequestIdOrderByTimestampDesc(String approvalRequestId);
    List<ApprovalLog> findByEventIdOrderByTimestampDesc(String eventId);
}
