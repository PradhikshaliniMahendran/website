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
@Document(collection = "certificates")
public class Certificate {

    @Id
    private String id;

    private String certificateNumber;

    private String eventId;

    private String eventTitle;

    private String userId;

    private String recipientName;

    private String type; // PARTICIPATION, ACHIEVEMENT, VOLUNTEER

    private String issuedDate;

    private String verificationCode;

    private String downloadUrl;

    @CreatedDate
    private LocalDateTime createdAt;
}
