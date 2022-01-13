CREATE TABLE orders (user_id bigint REFERENCES users(id), id SERIAL PRIMARY KEY, order_status VARCHAR(100));
