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

RUN useradd -m springuser
USER springuser

COPY --from=build /app/user-service/target/*.jar app.jar

ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=$PORT --server.address=0.0.0.0"]
