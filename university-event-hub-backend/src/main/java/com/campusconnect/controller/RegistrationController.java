package com.campusconnect.controller;

import com.campusconnect.model.Registration;
import com.campusconnect.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "*")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Registration>> getUserRegistrations(@PathVariable String userId) {
        return ResponseEntity.ok(registrationRepository.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Registration> registerForEvent(@RequestBody Registration registration) {
        if (registrationRepository.existsByEventIdAndUserId(registration.getEventId(), registration.getUserId())) {
            return ResponseEntity.badRequest().build();
        }

        String qrPayload = "CAMPUS-REG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        registration.setQrCode(qrPayload);
        registration.setStatus("CONFIRMED");
        registration.setCheckInStatus("NOT_CHECKED_IN");
        registration.setCertificateEligible(true);

        return ResponseEntity.ok(registrationRepository.save(registration));
    }

    @PostMapping("/scan")
    public ResponseEntity<Registration> scanCheckIn(@RequestParam String qrCode) {
        return registrationRepository.findByQrCode(qrCode).map(reg -> {
            reg.setCheckInStatus("ATTENDED");
            reg.setCheckInTime(java.time.LocalDateTime.now());
            return ResponseEntity.ok(registrationRepository.save(reg));
        }).orElse(ResponseEntity.notFound().build());
    }
}
