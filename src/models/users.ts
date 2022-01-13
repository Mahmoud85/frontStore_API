import client from "../database";
import bcrypt from "bcrypt";

const salt = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD as string;

export type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
};

export default class UserStore {
  async index(): Promise<User[]> {
    try {
      const sqlQuery: string = "SELECT * FROM users";

      const conn = await client.connect();
      const result = await conn.query(sqlQuery);
      conn.release();
      const usersList = result.rows;

      return usersList;
    } catch (error) {
      throw new Error(`Could not get Users.\n ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sqlQuery: string = "SELECT * FROM users WHERE id = ($1)";

      const conn = await client.connect();
      const result = await conn.query(sqlQuery, [id]);
      conn.release();
      const user = result.rows[0];

      return user;
    } catch (error) {
      throw new Error(`Could not find User with user name: ${id}.\n ${error}`);
    }
  }
  async findByMail(email: string): Promise<User> {
    try {
      const sqlQuery: string = "SELECT * FROM users WHERE email = ($1)";

      const conn = await client.connect();
      const result = await conn.query(sqlQuery, [email]);
      conn.release();
      const user = result.rows[0];

      return user;
    } catch (error) {
      throw new Error(
        `Could not find User with user name: ${email}.\n ${error}`
      );
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql: string =
        "INSERT INTO users (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *";

      const conn = await client.connect();
      const hash = bcrypt.hashSync(user.password + pepper, parseInt(salt));
      const result = await conn.query(sql, [
        user.email,
        user.first_name,
        user.last_name,
        hash,
      ]);
      conn.release();
      const newUser = result.rows[0];

      return newUser;
    } catch (error) {
      throw new Error(
        `Error creating new User(${user.first_name} ${user.last_name}).\n ${error}`
      );
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = "SELECT password FROM users WHERE email=($1)";
    const result = await conn.query(sql, [email]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }

    return null;
  }
}
