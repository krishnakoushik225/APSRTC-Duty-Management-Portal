# Stage 1: build
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

COPY mvnw mvnw
COPY .mvn .mvn
COPY pom.xml pom.xml

COPY user-service/ user-service/

RUN chmod +x mvnw

RUN ./mvnw -q -DskipTests clean package -pl user-service -am

# Stage 2: runtime
FROM eclipse-temurin:17-jre
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends wget \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m springuser
USER springuser

COPY --from=build /app/user-service/target/*.jar app.jar

ENV PORT=8080
# Production profile: Flyway + Redis blocklist + OTLP (configure via env)
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD wget -qO- "http://127.0.0.1:${PORT:-8080}/actuator/health/liveness" | grep -q "\"status\":\"UP\"" || exit 1

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=$PORT --server.address=0.0.0.0"]
