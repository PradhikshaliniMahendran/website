package com.campusconnect.repository;

import com.campusconnect.model.Certificate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends MongoRepository<Certificate, String> {
    List<Certificate> findByUserId(String userId);
    Optional<Certificate> findByVerificationCode(String verificationCode);
}
