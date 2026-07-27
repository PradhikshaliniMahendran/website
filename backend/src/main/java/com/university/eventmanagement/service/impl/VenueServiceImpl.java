package com.university.eventmanagement.service.impl;

import com.university.eventmanagement.dto.venue.TimeSlotDto;
import com.university.eventmanagement.dto.venue.VenueDto;
import com.university.eventmanagement.entity.Event;
import com.university.eventmanagement.entity.Venue;
import com.university.eventmanagement.entity.enums.VenueStatus;
import com.university.eventmanagement.exception.BadRequestException;
import com.university.eventmanagement.exception.ResourceNotFoundException;
import com.university.eventmanagement.repository.EventRepository;
import com.university.eventmanagement.repository.VenueRepository;
import com.university.eventmanagement.service.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VenueServiceImpl implements VenueService {

    private final VenueRepository venueRepository;
    private final EventRepository eventRepository;

    @Override
    public List<VenueDto> getAllVenues() {
        return venueRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public VenueDto getVenueById(String id) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
        return mapToDto(venue);
    }

    @Override
    public VenueDto createVenue(VenueDto venueDto) {
        if (venueRepository.existsByName(venueDto.getName())) {
            throw new BadRequestException("Venue name already exists: " + venueDto.getName());
        }
        if (venueRepository.existsByCode(venueDto.getCode())) {
            throw new BadRequestException("Venue code already exists: " + venueDto.getCode());
        }

        Venue venue = Venue.builder()
                .name(venueDto.getName())
                .code(venueDto.getCode())
                .building(venueDto.getBuilding())
                .floor(venueDto.getFloor())
                .capacity(venueDto.getCapacity())
                .description(venueDto.getDescription())
                .facilities(venueDto.getFacilities() != null ? venueDto.getFacilities() : new ArrayList<>())
                .images(venueDto.getImages() != null ? venueDto.getImages() : new ArrayList<>())
                .status(venueDto.getStatus() != null ? venueDto.getStatus() : VenueStatus.AVAILABLE)
                .maintenanceNotes(venueDto.getMaintenanceNotes())
                .build();

        Venue saved = venueRepository.save(venue);
        return mapToDto(saved);
    }

    @Override
    public VenueDto updateVenue(String id, VenueDto venueDto) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));

        venue.setName(venueDto.getName());
        venue.setBuilding(venueDto.getBuilding());
        venue.setFloor(venueDto.getFloor());
        venue.setCapacity(venueDto.getCapacity());
        venue.setDescription(venueDto.getDescription());
        if (venueDto.getFacilities() != null) venue.setFacilities(venueDto.getFacilities());
        if (venueDto.getImages() != null) venue.setImages(venueDto.getImages());
        if (venueDto.getStatus() != null) venue.setStatus(venueDto.getStatus());
        if (venueDto.getMaintenanceNotes() != null) venue.setMaintenanceNotes(venueDto.getMaintenanceNotes());

        Venue updated = venueRepository.save(venue);
        return mapToDto(updated);
    }

    @Override
    public void deleteVenue(String id) {
        if (!venueRepository.existsById(id)) {
            throw new ResourceNotFoundException("Venue not found with id: " + id);
        }
        venueRepository.deleteById(id);
    }

    @Override
    public List<TimeSlotDto> getVenueAvailabilitySchedule(String venueId, LocalDate date) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));

        List<Event> venueEvents = eventRepository.findByVenueIdAndArchivedFalse(venueId);

        List<TimeSlotDto> slots = new ArrayList<>();
        // Generate hourly slots from 8 AM to 8 PM
        for (int hour = 8; hour < 20; hour++) {
            LocalDateTime startLdt = date.atTime(hour, 0);
            LocalDateTime endLdt = date.atTime(hour + 1, 0);
            ZonedDateTime startZdt = startLdt.atZone(ZoneId.systemDefault());
            ZonedDateTime endZdt = endLdt.atZone(ZoneId.systemDefault());

            Event overlapping = venueEvents.stream()
                    .filter(e -> e.getStartDate().isBefore(endZdt.toInstant()) && e.getEndDate().isAfter(startZdt.toInstant()))
                    .findFirst()
                    .orElse(null);

            slots.add(TimeSlotDto.builder()
                    .slotId(venueId + "-" + hour)
                    .startTime(startZdt.toInstant())
                    .endTime(endZdt.toInstant())
                    .available(overlapping == null && venue.getStatus() == VenueStatus.AVAILABLE)
                    .reservedByEventId(overlapping != null ? overlapping.getId() : null)
                    .reservedByEventTitle(overlapping != null ? overlapping.getTitle() : null)
                    .build());
        }

        return slots;
    }

    @Override
    public VenueDto updateVenueStatus(String id, VenueStatus status, String maintenanceNotes) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));

        venue.setStatus(status);
        if (maintenanceNotes != null) venue.setMaintenanceNotes(maintenanceNotes);

        Venue updated = venueRepository.save(venue);
        return mapToDto(updated);
    }

    private VenueDto mapToDto(Venue venue) {
        return VenueDto.builder()
                .id(venue.getId())
                .name(venue.getName())
                .code(venue.getCode())
                .building(venue.getBuilding())
                .floor(venue.getFloor())
                .capacity(venue.getCapacity())
                .description(venue.getDescription())
                .facilities(venue.getFacilities())
                .images(venue.getImages())
                .status(venue.getStatus())
                .maintenanceNotes(venue.getMaintenanceNotes())
                .createdAt(venue.getCreatedAt())
                .updatedAt(venue.getUpdatedAt())
                .build();
    }
}
