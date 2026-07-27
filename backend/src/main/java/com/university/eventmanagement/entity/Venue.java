package com.university.eventmanagement.entity;

import com.university.eventmanagement.entity.enums.VenueStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "venues")
public class Venue {
    @Id
    private String id;

    @Indexed(unique = true)
    private String name;

    @Indexed(unique = true)
    private String code;

    private String building;
    private String floor;
    private int capacity;
    private String description;

    @Builder.Default
    private List<String> facilities = new ArrayList<>(); // Projector, Sound System, AC, Stage, Wifi, etc.

    @Builder.Default
    private List<String> images = new ArrayList<>();

    @Builder.Default
    private VenueStatus status = VenueStatus.AVAILABLE;

    private String maintenanceNotes;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
