import client from "../database";
import { Order } from "../models/orders";

export default class orderStatus {
  orderPerUserSQL =
    "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";

  async getActiveOrdersPerUser(user_id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const activeOrders = await conn.query(this.orderPerUserSQL, [
        user_id,
        "active",
      ]);
      conn.release();

      return activeOrders.rows[0];
    } catch (error) {
      throw new Error(`Could not get active Orders.\n ${error}`);
    }
  }

  async getCompoeteOrdersPerUser(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const completeOrders = await conn.query(this.orderPerUserSQL, [
        user_id,
        "complete",
      ]);
      conn.release();

      return completeOrders.rows;
    } catch (error) {
      throw new Error(`Could not get completed Orders.\n ${error}`);
    }
  }
}
