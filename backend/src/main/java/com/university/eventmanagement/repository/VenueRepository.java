package com.university.eventmanagement.repository;

import com.university.eventmanagement.entity.Venue;
import com.university.eventmanagement.entity.enums.VenueStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VenueRepository extends MongoRepository<Venue, String> {
    Optional<Venue> findByCode(String code);
    Optional<Venue> findByName(String name);
    Boolean existsByName(String name);
    Boolean existsByCode(String code);
    List<Venue> findByStatus(VenueStatus status);
}
