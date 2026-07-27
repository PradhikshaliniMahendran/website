package com.university.eventmanagement.repository;

import com.university.eventmanagement.entity.EventVersion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventVersionRepository extends MongoRepository<EventVersion, String> {
    List<EventVersion> findByEventIdOrderByVersionNumberDesc(String eventId);
}
