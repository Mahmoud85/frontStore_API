import orderStore, { Order } from "../models/orders";
import supertest from "supertest";
import app from "../server";

const store = new orderStore();
const request = supertest(app);

describe("test the product order database", () => {
  it("place order method do exists", () => {
    expect(store.placeOrder).toBeDefined();
  });
  beforeAll(() => {});
  it("placeOrder handler works properly", async () => {
    const result = await store.placeOrder({
      user_id: 1,
      order_id: 1,
      product_id: 1,
    });
    expect(result).toEqual({
      id: result.id,
      //@ts-ignore
      user_id: "1",
      //@ts-ignore
      order_id: "1",
      //@ts-ignore
      product_id: "1",
    });
  });
});
