# Storefront Backend Project

## Getting Started

This project is prepard as an an assignement for udacity advanced full stack nano degree and created basically upon the starter project provided by udacity.

### ENV File

This porject set environement variables using donenv library , you should include the below in your `.env` file which should be in project root

- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_TEST_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- ENV
- BCRYPT_PASSWORD
- SALT_ROUNDS
- TOKEN_SECRET

## how to run the project

- setup the database

* creat a user `CREATE USER magical_user WITH PASSWORD 'jw8s0F4' CREATEDB;`
* create database for dev `CREATE DATABASE front_store_db;`
* create database for test `CREATE DATABASE front_store_db_test;`
* grant privileges to your `GRANT ALL PRIVILEGES ON DATABASE front_store_db TO magical_user;`
* grant privileges to your `GRANT ALL PRIVILEGES ON DATABASE front_store_db_test TO magical_user;`

* `npm i`
* create two databases 'one for dev and other for testing'.
* create a user and grant database privilages to it.
* update the `database.json` and `.env` file the new values
* `npm run build to build the js` or `npm run watch to start TS watcher`
* to migrate the database `npm run migrate`
* to recall the migration `npm run migrate-down`
* to run unit testing `npm run test`
