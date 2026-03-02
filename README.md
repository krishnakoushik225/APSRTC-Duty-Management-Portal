# 🚍 APSRTC Duty Management Portal  
### Secure Java Full Stack Application (Spring Boot + React + PostgreSQL)

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Database-PostgreSQL-316192?logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Security-JWT-orange"/>
  <img src="https://img.shields.io/badge/Build-Maven-C71A36?logo=apachemaven&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled%20With-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white"/>
</p>

---

## 📌 Overview

A **secure full-stack workforce management system** built for APSRTC-style transport operations.  
This application enables administrators to manage employees, assign duties, approve leave requests, and monitor login activity — while providing employees a secure platform to manage their duties and leave applications.

The project demonstrates **JWT authentication, role-based access control, OTP-based password reset, REST API design, and full-stack integration.**

---

## 🏗️ Architecture Overview

```
React (Frontend)
        ↓
Axios (Interceptor + JWT)
        ↓
Spring Boot REST API
        ↓
Spring Security (JWT Filter)
        ↓
Service Layer
        ↓
JPA / Hibernate
        ↓
PostgreSQL
```

✔ Clean layered architecture  
✔ Role-based security enforcement  
✔ Separation of concerns (Controller → Service → Repository)

---

## 🚀 Tech Stack

### 🔹 Backend
- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- PostgreSQL
- Maven (Multi-module Architecture)
- Docker

### 🔹 Frontend
- React (CRA)
- React Router
- React Query
- Axios (Token Interceptor)
- Tailwind CSS
- CRACO

---

## 🔐 Core Features

### 👤 Authentication & Security
- JWT-based authentication
- Role-based access control (Admin / User)
- Token blacklist on logout
- OTP-based password reset via email
- Secure protected routes

---

### 🧑‍💼 Admin Capabilities
- Add / Edit / Delete Users
- Assign Duties to Employees
- Approve / Reject Leave Requests
- Search Users
- View Login History
- Workforce Dashboard

---

### 🧑‍🔧 Employee Capabilities
- View Assigned Duties
- Submit Leave Requests
- Track Leave Status
- View Duty History
- Reset Password via OTP

---

## 📂 Project Structure

```
apsrtc-duty-project/
│
├── apsrtc-spring/                 # Spring Boot Backend
│   ├── user-service/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── model/
│   │   └── application.properties
│
├── apsrtc-react/                  # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── components/
│   │   └── App.js
│   └── .env
```

---

## ⚙️ Environment Configuration

### 🔹 Backend Configuration

`application.properties` uses environment variables:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}

app.jwt.secret=${JWT_SECRET}
```

### Required Environment Variables

```
DB_URL
DB_USERNAME
DB_PASSWORD
MAIL_USERNAME
MAIL_PASSWORD
JWT_SECRET
```

---

## 🖥️ Running the Project Locally

---

### 🔹 Backend

```bash
cd apsrtc-spring
./mvnw -pl user-service -am spring-boot:run
```

Runs on:
```
http://localhost:8080
```

---

### 🔹 Frontend

```bash
cd apsrtc-react
npm install
```

Create `.env`:

```env
REACT_APP_API_URL=http://localhost:8080
```

Start frontend:

```bash
npm start
```

Runs on:
```
http://localhost:3000
```

---

## 🐳 Docker Support

Build backend Docker image:

```bash
docker build -t apsrtc-backend .
```

Run container:

```bash
docker run -p 8080:8080 apsrtc-backend
```

---

## 🧠 Security Implementation Details

- Custom JWT Filter integrated with Spring Security
- Token validation on every request
- In-memory token blacklist for logout invalidation
- OTP validation service for password reset
- Route protection using role-based authorities
- Axios interceptor for dynamic token handling

---

## 📈 What This Project Demonstrates

✔ Secure REST API development  
✔ Full-stack integration (React ↔ Spring Boot)  
✔ Authentication & Authorization best practices  
✔ Role-based access control  
✔ Multi-module Maven project structure  
✔ Dockerized backend service  
✔ Clean enterprise-ready architecture  

---

## 🔮 Future Enhancements

- Replace in-memory OTP with Redis
- Distributed token blacklist
- Refresh token mechanism
- Pagination & filtering improvements
- Audit logging system
- CI/CD integration
- Kubernetes deployment

---

## 👨‍💻 Author

**Krishna Koushik Unnam**  
Java Full Stack Developer  

> Spring Boot | React | PostgreSQL | Docker | Secure API Design  

---

## ⭐ If you found this project interesting
Give it a star and feel free to explore the codebase!