CREATE TABLE product_orders (order_id bigint REFERENCES orders(id), product_id bigint REFERENCES products(id), quantity integer, id SERIAL PRIMARY KEY);
