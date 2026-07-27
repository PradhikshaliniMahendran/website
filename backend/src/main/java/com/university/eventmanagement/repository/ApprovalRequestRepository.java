package com.university.eventmanagement.repository;

import com.university.eventmanagement.entity.ApprovalRequest;
import com.university.eventmanagement.entity.enums.ApprovalStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalRequestRepository extends MongoRepository<ApprovalRequest, String> {
    Optional<ApprovalRequest> findByEventId(String eventId);
    Page<ApprovalRequest> findByStatus(ApprovalStatus status, Pageable pageable);
    List<ApprovalRequest> findByRequesterId(String requesterId);
    long countByStatus(ApprovalStatus status);
}
