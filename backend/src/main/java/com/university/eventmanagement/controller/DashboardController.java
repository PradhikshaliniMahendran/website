package com.university.eventmanagement.controller;

import com.university.eventmanagement.dto.common.ApiResponse;
import com.university.eventmanagement.dto.dashboard.*;
import com.university.eventmanagement.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getUnifiedDashboardStats() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getUnifiedDashboardStats()));
    }

    @GetMapping("/user-stats")
    public ResponseEntity<ApiResponse<UserStatsDto>> getUserStats() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getUserStats()));
    }

    @GetMapping("/event-stats")
    public ResponseEntity<ApiResponse<EventStatsDto>> getEventStats() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getEventStats()));
    }

    @GetMapping("/approval-stats")
    public ResponseEntity<ApiResponse<ApprovalStatsDto>> getApprovalStats() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getApprovalStats()));
    }
}
