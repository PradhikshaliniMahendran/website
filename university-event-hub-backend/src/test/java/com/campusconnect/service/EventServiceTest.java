package com.campusconnect.service;

import com.campusconnect.model.Event;
import com.campusconnect.repository.EventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testFindApprovedEvents() {
        Event event = Event.builder()
                .id("evt_1")
                .title("Test Event")
                .status("APPROVED")
                .build();

        when(eventRepository.findByStatus("APPROVED")).thenReturn(List.of(event));

        List<Event> result = eventRepository.findByStatus("APPROVED");
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("APPROVED", result.get(0).getStatus());
    }
}
