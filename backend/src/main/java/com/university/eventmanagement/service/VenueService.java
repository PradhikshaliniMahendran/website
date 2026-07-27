package com.university.eventmanagement.service;

import com.university.eventmanagement.dto.venue.TimeSlotDto;
import com.university.eventmanagement.dto.venue.VenueDto;
import com.university.eventmanagement.entity.enums.VenueStatus;

import java.time.LocalDate;
import java.util.List;

public interface VenueService {
    List<VenueDto> getAllVenues();
    VenueDto getVenueById(String id);
    VenueDto createVenue(VenueDto venueDto);
    VenueDto updateVenue(String id, VenueDto venueDto);
    void deleteVenue(String id);
    List<TimeSlotDto> getVenueAvailabilitySchedule(String venueId, LocalDate date);
    VenueDto updateVenueStatus(String id, VenueStatus status, String maintenanceNotes);
}
