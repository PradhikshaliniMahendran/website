package com.campusconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardAnalytics() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalEvents", 42);
        data.put("activeClubs", 18);
        data.put("registeredStudents", 2847);
        data.put("overallEngagementRate", "84.5%");
        return ResponseEntity.ok(data);
    }
}
