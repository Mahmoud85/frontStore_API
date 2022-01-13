import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  ENV,
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: ENV !== "test" ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
