package com.campusconnect.controller;

import com.campusconnect.model.Certificate;
import com.campusconnect.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Certificate>> getCertificatesByUser(@PathVariable String userId) {
        return ResponseEntity.ok(certificateRepository.findByUserId(userId));
    }

    @GetMapping("/verify/{code}")
    public ResponseEntity<Certificate> verifyCertificate(@PathVariable String code) {
        return certificateRepository.findByVerificationCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
