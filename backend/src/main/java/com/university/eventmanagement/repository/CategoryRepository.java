package com.university.eventmanagement.repository;

import com.university.eventmanagement.entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    Optional<Category> findByName(String name);
    Optional<Category> findBySlug(String slug);
    Boolean existsByName(String name);
}
