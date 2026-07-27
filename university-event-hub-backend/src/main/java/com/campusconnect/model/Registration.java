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
@Document(collection = "registrations")
public class Registration {

    @Id
    private String id;

    private String eventId;

    private String eventTitle;

    private String userId;

    private String userName;

    @CreatedDate
    private LocalDateTime registrationDate;

    private String status; // CONFIRMED, WAITING, CANCELLED, ATTENDED

    private String qrCode;

    private String checkInStatus; // NOT_CHECKED_IN, ATTENDED

    private LocalDateTime checkInTime;

    private Boolean certificateEligible;
}
