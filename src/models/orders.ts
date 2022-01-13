import client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
  status: string;
};

export default class OrdersStore {
  async index(): Promise<Order[]> {
    try {
      const sql: string = "SELECT * FROM orders";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get Orders.\n ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql: string = "SELECT * FROM orders WHERE id = ($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const order = result.rows[0];

      return order;
    } catch (error) {
      throw new Error(`Could not find Order with id: ${id}.\n ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql: string =
        "INSERT INTO orders (user_id, product_id, quantity, status) VALUES($1, $2, $3, $4) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order.user_id,
        order.product_id,
        order.quantity,
        order.status,
      ]);

      const newOrder = result.rows[0];
      conn.release();

      return newOrder;
    } catch (error) {
      throw new Error(
        `Error attempting to create new Order(${order.product_id}, ${order.status}).\n ${error}`
      );
    }
  }

  async clearAll() {
    try {
      const sql: string = "DELETE FROM orders";
      const conn = await client.connect();
      await conn.query(sql);
      conn.release();
    } catch (error) {
      throw new Error(`Error Deleting Orders.\n ${error}`);
    }
  }
}
