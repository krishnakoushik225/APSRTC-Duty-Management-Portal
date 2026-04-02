-- Baseline schema (PostgreSQL). Aligns with JPA entities.

CREATE TABLE users (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    depo VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_date DATE NOT NULL,
    CONSTRAINT uk_users_email UNIQUE (email),
    CONSTRAINT uk_users_contact_number UNIQUE (contact_number)
);

CREATE TABLE duty_details (
    id BIGSERIAL PRIMARY KEY,
    district VARCHAR(255) NOT NULL,
    depo VARCHAR(255) NOT NULL,
    village VARCHAR(255) NOT NULL,
    bus_type VARCHAR(255) NOT NULL,
    start_date VARCHAR(255) NOT NULL,
    end_date VARCHAR(255) NOT NULL,
    start_time VARCHAR(255) NOT NULL,
    end_time VARCHAR(255) NOT NULL
);

CREATE TABLE previous_duties (
    user_id VARCHAR(255) NOT NULL PRIMARY KEY,
    district VARCHAR(255) NOT NULL,
    depo VARCHAR(255) NOT NULL,
    village VARCHAR(255) NOT NULL,
    bus_type VARCHAR(255) NOT NULL,
    start_date VARCHAR(255) NOT NULL,
    end_date VARCHAR(255) NOT NULL,
    start_time VARCHAR(255) NOT NULL,
    end_time VARCHAR(255) NOT NULL
);

CREATE TABLE login_histories (
    user_id VARCHAR(255) NOT NULL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    data_id BIGINT,
    CONSTRAINT fk_login_histories_duty FOREIGN KEY (data_id) REFERENCES duty_details (id)
);

CREATE TABLE leaves (
    leave_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    status VARCHAR(255)
);

CREATE INDEX idx_leaves_user_id ON leaves (user_id);
CREATE INDEX idx_leaves_status ON leaves (status);
