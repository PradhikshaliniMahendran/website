package com.campusconnect.repository;

import com.campusconnect.model.Registration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends MongoRepository<Registration, String> {
    List<Registration> findByUserId(String userId);
    List<Registration> findByEventId(String eventId);
    Optional<Registration> findByQrCode(String qrCode);
    Boolean existsByEventIdAndUserId(String eventId, String userId);
}
