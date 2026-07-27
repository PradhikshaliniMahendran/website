package com.university.eventmanagement.repository;

import com.university.eventmanagement.entity.Event;
import com.university.eventmanagement.entity.enums.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    Optional<Event> findByEventCode(String eventCode);

    List<Event> findByVenueIdAndArchivedFalse(String venueId);

    @Query("{ 'venueId': ?0, 'status': { $ne: 'CANCELLED' }, 'archived': false, $or: [ { 'startDate': { $lt: ?2 }, 'endDate': { $gt: ?1 } } ] }")
    List<Event> findConflictingEvents(String venueId, Instant startDate, Instant endDate);

    @Query("{ 'venueId': ?0, 'id': { $ne: ?3 }, 'status': { $ne: 'CANCELLED' }, 'archived': false, $or: [ { 'startDate': { $lt: ?2 }, 'endDate': { $gt: ?1 } } ] }")
    List<Event> findConflictingEventsExcludingId(String venueId, Instant startDate, Instant endDate, String excludeEventId);

    List<Event> findByTitleIgnoreCaseAndStartDateBetween(String title, Instant startRange, Instant endRange);

    Page<Event> findByArchivedFalse(Pageable pageable);
    
    Page<Event> findByStatusAndArchivedFalse(EventStatus status, Pageable pageable);
    
    Page<Event> findByIsFeaturedTrueAndArchivedFalse(Pageable pageable);
    
    List<Event> findByStartDateAfterAndArchivedFalseOrderByStartDateAsc(Instant date);

    long countByStatusAndArchivedFalse(EventStatus status);
    long countByIsFeaturedTrueAndArchivedFalse();
}
