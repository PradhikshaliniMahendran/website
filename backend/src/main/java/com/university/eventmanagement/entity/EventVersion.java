package com.university.eventmanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "event_versions")
public class EventVersion {
    @Id
    private String id;
    private String eventId;
    private int versionNumber;
    private String changeSummary;
    private String modifiedByUserId;
    private String snapshotJson;

    @CreatedDate
    private Instant createdAt;
}
