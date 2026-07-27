package com.university.eventmanagement.repository;

import com.university.eventmanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Optional<User> findByPasswordResetToken(String token);

    @Query("{ $or: [ { 'fullName': { $regex: ?0, $options: 'i' } }, { 'email': { $regex: ?0, $options: 'i' } }, { 'username': { $regex: ?0, $options: 'i' } }, { 'department': { $regex: ?0, $options: 'i' } } ] }")
    Page<User> searchUsers(String query, Pageable pageable);

    Page<User> findByRolesContaining(String role, Pageable pageable);
    
    long countByActiveTrue();
}
