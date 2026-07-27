package com.university.eventmanagement.service;

import com.university.eventmanagement.dto.dashboard.*;

public interface DashboardService {
    DashboardStatsDto getUnifiedDashboardStats();
    UserStatsDto getUserStats();
    EventStatsDto getEventStats();
    ApprovalStatsDto getApprovalStats();
}
