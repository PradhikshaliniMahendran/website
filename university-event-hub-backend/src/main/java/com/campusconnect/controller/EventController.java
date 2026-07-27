package com.campusconnect.controller;

import com.campusconnect.model.Event;
import com.campusconnect.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        if (event.getStatus() == null) {
            event.setStatus("PENDING");
        }
        Event saved = eventRepository.save(event);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Event> updateEventStatus(@PathVariable String id, @RequestParam String status, @RequestParam(required = false) String comments) {
        return eventRepository.findById(id).map(evt -> {
            evt.setStatus(status);
            evt.setApproval(Event.ApprovalInfo.builder()
                    .status(status)
                    .comments(comments != null ? comments : "Status updated by Faculty/Admin")
                    .build());
            return ResponseEntity.ok(eventRepository.save(evt));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
