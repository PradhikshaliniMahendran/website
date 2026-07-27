package com.campusconnect.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "announcements")
public class Announcement {

    @Id
    private String id;

    private String clubId;

    private String clubName;

    private String title;

    private String content;

    private String type; // IMPORTANT, UPDATE, EVENT, GENERAL

    private String priority; // HIGH, MEDIUM, LOW

    private String targetAudience; // ALL, MEMBERS_ONLY, PUBLIC

    @CreatedDate
    private LocalDateTime date;
}
