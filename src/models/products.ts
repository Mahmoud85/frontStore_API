import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export default class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sqlQuery: string = "SELECT * FROM products";
      const conn = await client.connect();
      const result = await conn.query(sqlQuery);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get Products.\n ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sqlQuery: string = "SELECT * FROM products WHERE id = ($1)";
      const conn = await client.connect();
      const result = await conn.query(sqlQuery, [id]);
      conn.release();
      const product = result.rows[0];

      return product;
    } catch (error) {
      throw new Error(`Could not find Product with id: ${id}.\n ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql: string =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product?.category,
      ]);
      const newProduct = result.rows[0];
      conn.release();
      return newProduct;
    } catch (error) {
      throw new Error(
        `Error unable to create product(${product.name}, ${product.price}, ${product.category}).\n ${error}`
      );
    }
  }
  async clearAll() {
    try {
      const sql: string = "DELETE FROM products";
      const conn = await client.connect();
      await conn.query(sql);
      conn.release();
    } catch (error) {
      throw new Error(`Error, unable to delete products.\n ${error}`);
    }
  }
}
