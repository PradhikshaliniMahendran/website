package com.university.eventmanagement.dto.dashboard;

import com.university.eventmanagement.dto.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatsDto {
    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;
    private Map<String, Long> roleDistribution;
    private List<UserDto> recentlyRegisteredUsers;
}
