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

- `npm i`
- create two databases 'one for dev and other for testing'.
- create a user and grant database privilages to it.
- update the `database.json` and `.env` file the new values
- `npm run build to build the js` or `npm run watch to start TS watcher`
- to migrate the database `npm run migrate`
- to recall the migration `npm run migrate-down`
- to run unit testing `npm run test`
