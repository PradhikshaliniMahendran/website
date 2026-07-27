package com.university.eventmanagement.config;

import com.university.eventmanagement.entity.*;
import com.university.eventmanagement.entity.enums.ApprovalStatus;
import com.university.eventmanagement.entity.enums.EventStatus;
import com.university.eventmanagement.entity.enums.RoleName;
import com.university.eventmanagement.entity.enums.VenueStatus;
import com.university.eventmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final VenueRepository venueRepository;
    private final EventRepository eventRepository;
    private final ApprovalRequestRepository approvalRequestRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("Checking database initialization status...");

        // 1. Initialize Roles
        for (RoleName roleName : RoleName.values()) {
            if (!roleRepository.existsByName(roleName)) {
                String displayName = roleName.name().replace("ROLE_", "").replace("_", " ");
                Role role = Role.builder()
                        .name(roleName)
                        .displayName(displayName)
                        .description("System role for " + displayName)
                        .permissions(Set.of("READ", "WRITE", "MANAGE_EVENTS", "MANAGE_VENUES"))
                        .build();
                roleRepository.save(role);
                log.info("Created role: {}", roleName);
            }
        }

        // 2. Initialize Seed Users if empty
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@university.edu")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("Dr. Eleanor Vance")
                    .department("Computer Science & Engineering")
                    .roles(Set.of("ROLE_ADMIN"))
                    .active(true)
                    .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150")
                    .build();
            userRepository.save(admin);

            User faculty = User.builder()
                    .username("faculty_admin")
                    .email("faculty@university.edu")
                    .password(passwordEncoder.encode("faculty123"))
                    .fullName("Prof. Robert Sterling")
                    .department("Academic Affairs")
                    .roles(Set.of("ROLE_FACULTY_ADMINISTRATOR"))
                    .active(true)
                    .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150")
                    .build();
            userRepository.save(faculty);

            User manager = User.builder()
                    .username("affairs_manager")
                    .email("affairs@university.edu")
                    .password(passwordEncoder.encode("manager123"))
                    .fullName("Marcus Aurelius Chen")
                    .department("Student Affairs Division")
                    .roles(Set.of("ROLE_STUDENT_AFFAIRS_MANAGER"))
                    .active(true)
                    .avatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150")
                    .build();
            userRepository.save(manager);

            User student = User.builder()
                    .username("student1")
                    .email("student1@university.edu")
                    .password(passwordEncoder.encode("student123"))
                    .fullName("Sophia Martinez")
                    .department("Software Engineering")
                    .studentId("SE-2024-089")
                    .roles(Set.of("ROLE_STUDENT", "ROLE_CLUB_PRESIDENT"))
                    .active(true)
                    .avatarUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150")
                    .build();
            userRepository.save(student);

            log.info("Initialized seed administrative & student users.");
        }

        // 3. Initialize Categories
        if (categoryRepository.count() == 0) {
            Category tech = Category.builder()
                    .name("Technology & Coding")
                    .slug("technology-coding")
                    .description("Hackathons, Tech Talks, Developer Conferences and Workshops")
                    .iconName("Code2")
                    .badgeColor("#3b82f6")
                    .build();
            categoryRepository.save(tech);

            Category cultural = Category.builder()
                    .name("Cultural & Arts")
                    .slug("cultural-arts")
                    .description("Music festivals, Art exhibitions, Theater & Dance shows")
                    .iconName("Sparkles")
                    .badgeColor("#ec4899")
                    .build();
            categoryRepository.save(cultural);

            Category sports = Category.builder()
                    .name("Sports & Athletics")
                    .slug("sports-athletics")
                    .description("Inter-college tournaments, Marathons and Fitness rallies")
                    .iconName("Trophy")
                    .badgeColor("#10b981")
                    .build();
            categoryRepository.save(sports);

            Category academic = Category.builder()
                    .name("Academic & Research")
                    .slug("academic-research")
                    .description("Research symposiums, Paper presentations, Guest lectures")
                    .iconName("BookOpen")
                    .badgeColor("#8b5cf6")
                    .build();
            categoryRepository.save(academic);

            log.info("Initialized seed categories.");
        }

        // 4. Initialize Venues
        if (venueRepository.count() == 0) {
            Venue hallA = Venue.builder()
                    .name("Grand Innovation Auditorium")
                    .code("AUD-A101")
                    .building("Turing Science & Tech Center")
                    .floor("1st Floor")
                    .capacity(500)
                    .description("State-of-the-art auditorium equipped with surround sound, dual projection screens, and stage lighting.")
                    .facilities(List.of("4K Dual Projectors", "Dolby Atmos Audio", "Stage Lighting", "High-speed Wi-Fi", "Central AC"))
                    .status(VenueStatus.AVAILABLE)
                    .build();
            venueRepository.save(hallA);

            Venue labB = Venue.builder()
                    .name("Cybersecurity & AI Complex Lab")
                    .code("LAB-B204")
                    .building("Lovelace Computing Building")
                    .floor("2nd Floor")
                    .capacity(120)
                    .description("High-performance computing lab with 120 workstation nodes.")
                    .facilities(List.of("NVIDIA Workstations", "Gigabit Ethernet", "Smart Whiteboards"))
                    .status(VenueStatus.AVAILABLE)
                    .build();
            venueRepository.save(labB);

            Venue quad = Venue.builder()
                    .name("Central Campus Amphitheater")
                    .code("OUT-Q01")
                    .building("Main Campus Plaza")
                    .floor("Ground Outdoor")
                    .capacity(1500)
                    .description("Open-air open outdoor venue perfect for mega cultural fests and concerts.")
                    .facilities(List.of("Outdoor Concert Stage", "PA System", "Green Room", "Food Stalls Area"))
                    .status(VenueStatus.AVAILABLE)
                    .build();
            venueRepository.save(quad);

            log.info("Initialized seed campus venues.");
        }

        // 5. Initialize Seed Events & Approvals
        if (eventRepository.count() == 0) {
            Category techCat = categoryRepository.findByName("Technology & Coding").orElse(null);
            Venue venueAud = venueRepository.findByCode("AUD-A101").orElse(null);
            User admin = userRepository.findByUsername("admin").orElse(null);

            if (techCat != null && venueAud != null && admin != null) {
                Event event = Event.builder()
                        .eventCode("EVT-2026-X781")
                        .title("Global AI & Developer Hackathon 2026")
                        .description("36-Hour continuous hackathon bringing together students, faculty, and industry mentors to build cutting-edge generative AI apps.")
                        .categoryId(techCat.getId())
                        .venueId(venueAud.getId())
                        .organizerId(admin.getId())
                        .startDate(Instant.now().plus(5, ChronoUnit.DAYS))
                        .endDate(Instant.now().plus(6, ChronoUnit.DAYS))
                        .registrationDeadline(Instant.now().plus(4, ChronoUnit.DAYS))
                        .capacity(350)
                        .registeredCount(184)
                        .isFree(true)
                        .isFeatured(true)
                        .status(EventStatus.PUBLISHED)
                        .bannerUrl("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200")
                        .tags(List.of("Hackathon", "AI", "Software", "Innovation"))
                        .version(1)
                        .build();
                Event saved = eventRepository.save(event);

                ApprovalRequest approval = ApprovalRequest.builder()
                        .eventId(saved.getId())
                        .requesterId(admin.getId())
                        .currentLevel(2)
                        .status(ApprovalStatus.APPROVED)
                        .comments("Approved by Student Affairs Committee")
                        .build();
                approvalRequestRepository.save(approval);

                log.info("Initialized seed featured event with approval request.");
            }
        }
    }
}
