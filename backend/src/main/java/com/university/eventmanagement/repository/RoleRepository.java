package com.university.eventmanagement.repository;

import com.university.eventmanagement.entity.Role;
import com.university.eventmanagement.entity.enums.RoleName;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(RoleName name);
    Boolean existsByName(RoleName name);
}
