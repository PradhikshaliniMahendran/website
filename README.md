# 🏛 Campus Connect - The Ultimate University Event Management Ecosystem

[![Java 17](https://img.shields.io/badge/Java-17_LTS-007396?logo=java)](https://oracle.com/java)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.1.5-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0%2B-47A248?logo=mongodb)](https://mongodb.com)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

**Campus Connect** is an enterprise-grade full-stack university event management platform built using **Java 17, Spring Boot 3.1.x, Spring Security (JWT), Spring Data MongoDB**, and a modern **React 18 + Vite + TailwindCSS** web application designed with the **"Campus Nexus"** identity.

---

## 📁 Repository Project Structure

```
website/
├── university-event-hub-backend/    # Java 17 + Spring Boot 3.1 Enterprise Backend
│   ├── pom.xml                       # Maven Build Specification & Dependencies
│   └── src/
│       ├── main/
│       │   ├── java/com/campusconnect/
│       │   │   ├── CampusConnectApplication.java
│       │   │   ├── config/           # Security, CORS, Mongo, WebSockets Configs
│       │   │   ├── controller/       # Auth, Event, Venue, Registration, Club, Analytics Controllers
│       │   │   ├── model/            # User, Event, Venue, Registration, Club, Certificate Models
│       │   │   ├── repository/       # Spring Data Mongo Repositories
│       │   │   ├── security/         # JWT Provider & Security Filters
│       │   │   └── util/             # QR Code & Certificate Generator Utilities
│       │   └── resources/
│       │       └── application.properties
│       └── test/java/com/campusconnect/service/
│           └── EventServiceTest.java # JUnit 5 Unit Tests
│
└── campus-connect-frontend/         # React 18 + Vite + TailwindCSS Interactive Frontend
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── components/               # Events, Venues, QR Scanner, Certificates, Analytics UI
        ├── contexts/                 # AuthContext (Role Switcher) & EventContext
        ├── data/                     # Seed Data
        └── styles/                   # Campus Nexus Tailwind CSS Tokens
```

---

## 👥 6 Major Functions & Group Member Division

| Member | Assigned Function | Responsibilities & Implementations |
| :--- | :--- | :--- |
| **Member 1** | **User & Security Management** | User Registration, JWT Authentication, Role-based Access Control (ADMIN, STUDENT, CLUB_HEAD, FACULTY), Profile Management, Avatar/Interests & Security Audit Logs. |
| **Member 2** | **Event Management** | Complete Event CRUD, Category Tagging, Capacity Controls, Draft & Publish System, Waitlist Management, Banner Media Uploads. |
| **Member 3** | **Venue & Approval Management** | Venue Directory & Resource Allocation, Time-slot Reservation, Capacity Conflict Checker, Faculty/Admin Approval Queue & History. |
| **Member 4** | **Registration & Attendance** | Instant Ticket Booking, Dynamic QR Code Generation, Real-Time Interactive QR Scanner, Check-in Verification & Attendance Log. |
| **Member 5** | **Club & Announcement Feed** | Club Profiles & Member Rosters, Club Category Filtering, Multi-channel Targeted Announcement Feed, Club Gallery. |
| **Member 6** | **Feedback, Analytics & Certificates** | Interactive Analytics Dashboard (Recharts), Monthly Attendance Growth, Category Breakdown, Event Rating System, Official PDF/Canvas Certificate Vault. |

---

## 🚀 Running the Project

### 1. Backend Setup (IntelliJ IDEA)
1. Open **IntelliJ IDEA**.
2. Select **Open** and choose the directory `website/university-event-hub-backend`.
3. IntelliJ will automatically detect Maven and import `pom.xml`.
4. Ensure **Java 17 (or newer)** is selected under Project Structure.
5. Ensure local MongoDB is running (`mongodb://localhost:27017/campus_connect_db`).
6. Run `CampusConnectApplication.java` or run:
```bash
cd university-event-hub-backend
mvn spring-boot:run
```
*Backend REST APIs run on `http://localhost:8080`.*

### 2. Frontend Web App Setup
```bash
cd campus-connect-frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 🎨 Theme Identity: "Campus Nexus"
- **Primary Royal Blue**: `#1A237E`
- **Deep Ocean**: `#0D47A1`
- **Campus Gold**: `#FF6F00`
- **Vibrant Teal**: `#00BFA5`
- **Energy Orange**: `#FF5722`
- **Typography**: Poppins (Headings), Inter (Body), Montserrat (Accents)

---

## 🌿 Git Branches
- `main`: Default primary branch.
- `midhurshan`: Dedicated development branch for Midhurshan Selvam.
- `shalini`: Dedicated development branch for Pradhikshalini Mahendran.
