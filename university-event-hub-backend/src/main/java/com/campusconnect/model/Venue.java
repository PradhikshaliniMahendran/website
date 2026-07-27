package com.campusconnect.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "venues")
public class Venue {

    @Id
    private String id;

    private String name;

    private String location;

    private Integer capacity;

    private List<ResourceItem> resources;

    private String status;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResourceItem {
        private String name;
        private Integer quantity;
        private Boolean available;
    }
}
