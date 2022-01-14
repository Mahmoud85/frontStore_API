# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- [POST] /products/addnew Create new product
- [GET] /products Return all available products
- [GET] /products/:id Return specific user as per id

#### Users

- [POST] /register Add new user
- [POST] /login Validate user and return access_token
- [GET] /users Return all users
- [GET] /users/:id Return specific user

#### Orders

- [POST] /orders/addnew Add new order
- [POST] /orders/:id/placeOrder Add new row to product-orders table and return the added item
- [GET] /orders/:id/active Retrive active orders as per use id
- [GET] /orders/:id/complete Retrive complete orders as per use id

## Data Shapes

#### Product

- id: [SERIAL PRIMARY KEY]
- name: [VARCHAR]
- price: [integer]
- category [VARCHAR]

#### User

- id: [SERIAL PRIMARY KEY]
- email: [VARCHAR] used as identifier for login
- first_name: [VARCHAR]
- last_name: [VARCHAR]
- password: [VARCHAR]

#### Orders

- id: [SERIAL PRIMARY KEY]
- user_id: [bigint REFERENCES users(id)]
- quantity: [integer]
- status:[VARCHAR]

### product_orders

- id: [SERIAL PRIMARY KEY]
- user_id [bigint REFERENCES users(id)]
- order_id [bigint REFERENCES orders(id)]
- product_id [bigint REFERENCES products(id)]

## database Schema

- users

                                        Table "public.users"

  Column | Type | Collation | Nullable | Default
  ------------+------------------------+-----------+----------+-----------------------------------
  id | integer | | not null | nextval('users_id_seq'::regclass)
  email | character varying(100) | | |
  first_name | character varying(100) | | |
  last_name | character varying(100) | | |
  password | character varying | | |
  Indexes:
  "users_pkey" PRIMARY KEY, btree (id)
  Referenced by:
  TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
  TABLE "product_orders" CONSTRAINT "product_orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

- products

                                        Table "public.products"

  Column | Type | Collation | Nullable | Default
  ----------+------------------------+-----------+----------+--------------------------------------
  name | character varying(100) | | |
  price | integer | | |
  category | character varying(200) | | |
  id | integer | | not null | nextval('products_id_seq'::regclass)
  Indexes:
  "products_pkey" PRIMARY KEY, btree (id)
  Referenced by:
  TABLE "product_orders" CONSTRAINT "product_orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

- orders

                                       Table "public.orders"

  Column | Type | Collation | Nullable | Default
  ----------+------------------------+-----------+----------+------------------------------------
  user_id | bigint | | |
  quantity | integer | | |
  status | character varying(100) | | |
  id | integer | | not null | nextval('orders_id_seq'::regclass)
  Indexes:
  "orders_pkey" PRIMARY KEY, btree (id)
  Foreign-key constraints:
  "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
  Referenced by:
  TABLE "product_orders" CONSTRAINT "product_orders_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

- product orders

                                Table "public.product_orders"

  Column | Type | Collation | Nullable | Default
  ------------+---------+-----------+----------+--------------------------------------------
  user_id | bigint | | |
  order_id | bigint | | |
  product_id | bigint | | |
  id | integer | | not null | nextval('product_orders_id_seq'::regclass)
  Indexes:
  "product_orders_pkey" PRIMARY KEY, btree (id)
  Foreign-key constraints:
  "product_orders_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
  "product_orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
  "product_orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
