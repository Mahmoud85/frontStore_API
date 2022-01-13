CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR
);