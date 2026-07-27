package com.campusconnect.repository;

import com.campusconnect.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByStatus(String status);
    List<Event> findByCategory(String category);
    List<Event> findByClubId(String clubId);
    List<Event> findByVenueId(String venueId);
}
