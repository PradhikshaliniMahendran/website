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
@Document(collection = "clubs")
public class Club {

    @Id
    private String id;

    private String name;

    private String category; // TECHNICAL, CULTURAL, SPORTS, ART, SOCIAL

    private String description;

    private String headId;

    private String headName;

    private String facultyAdvisor;

    private String logo;

    private String banner;

    @Builder.Default
    private Integer membersCount = 1;

    @Builder.Default
    private Integer eventsCount = 0;

    @CreatedDate
    private LocalDateTime createdAt;
}
