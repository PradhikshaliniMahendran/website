package com.university.eventmanagement.controller;

import com.university.eventmanagement.dto.common.ApiResponse;
import com.university.eventmanagement.dto.venue.TimeSlotDto;
import com.university.eventmanagement.dto.venue.VenueDto;
import com.university.eventmanagement.entity.enums.VenueStatus;
import com.university.eventmanagement.service.VenueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/venues")
@RequiredArgsConstructor
public class VenueController {

    private final VenueService venueService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<VenueDto>>> getAllVenues() {
        return ResponseEntity.ok(ApiResponse.success(venueService.getAllVenues()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VenueDto>> getVenueById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success(venueService.getVenueById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY_ADMINISTRATOR')")
    public ResponseEntity<ApiResponse<VenueDto>> createVenue(@Valid @RequestBody VenueDto venueDto) {
        VenueDto created = venueService.createVenue(venueDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Venue created successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY_ADMINISTRATOR')")
    public ResponseEntity<ApiResponse<VenueDto>> updateVenue(@PathVariable String id, @Valid @RequestBody VenueDto venueDto) {
        VenueDto updated = venueService.updateVenue(id, venueDto);
        return ResponseEntity.ok(ApiResponse.success("Venue updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteVenue(@PathVariable String id) {
        venueService.deleteVenue(id);
        return ResponseEntity.ok(ApiResponse.success("Venue deleted", null));
    }

    @GetMapping("/{id}/schedule")
    public ResponseEntity<ApiResponse<List<TimeSlotDto>>> getVenueSchedule(
            @PathVariable String id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<TimeSlotDto> schedule = venueService.getVenueAvailabilitySchedule(id, date);
        return ResponseEntity.ok(ApiResponse.success(schedule));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY_ADMINISTRATOR')")
    public ResponseEntity<ApiResponse<VenueDto>> updateVenueStatus(
            @PathVariable String id,
            @RequestParam VenueStatus status,
            @RequestParam(required = false) String maintenanceNotes) {
        VenueDto updated = venueService.updateVenueStatus(id, status, maintenanceNotes);
        return ResponseEntity.ok(ApiResponse.success("Venue status updated", updated));
    }
}
