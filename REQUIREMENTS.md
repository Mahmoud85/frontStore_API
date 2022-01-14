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
