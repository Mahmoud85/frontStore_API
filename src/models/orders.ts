import client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
  status: string;
};
export type OrderProduct = {
  user_id: number;
  product_id: number;
  order_id: number;
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
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [order.user_id, order.status]);

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

  async placeOrder(placedOrder: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        "INSERT INTO order_products (user_id, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();

      const result = await conn.query(sql, [
        placedOrder.user_id,
        placedOrder.order_id,
        placedOrder.product_id,
      ]);

      const row = result.rows[0];
      conn.release();
      return row;
    } catch (err) {
      throw new Error(
        `Could not add product ${placedOrder.product_id} to order ${placedOrder.order_id}: ${err}`
      );
    }
  }
}
