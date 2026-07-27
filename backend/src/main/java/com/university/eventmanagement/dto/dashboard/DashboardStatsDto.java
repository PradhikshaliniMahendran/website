package com.university.eventmanagement.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private UserStatsDto userStats;
    private EventStatsDto eventStats;
    private ApprovalStatsDto approvalStats;
    private List<RecentActivityDto> recentActivities;
}
