import orderStore, { Order } from "../models/orders";
import supertest from "supertest";
import app from "../server";
import _userStore, { User } from "../models/users";
import _ProductStore, { Product } from "../models/products";

const userStore = new _userStore();
const ProductStore = new _ProductStore();

const store = new orderStore();
const request = supertest(app);
let newUSer: User;
let newProduct: Product;
let newOrder: Order;

describe("test the product order database", () => {
  it("place order method do exists", () => {
    expect(store.placeOrder).toBeDefined();
  });
  beforeAll(async () => {
    newUSer = await userStore.create({
      email: "prodOrderTest@mail.com",
      first_name: "User",
      last_name: "Test",
      password: "password",
    });
    newProduct = await ProductStore.create({
      name: "orange",
      price: 1,
      category: "fruit",
    });
    newOrder = await store.create({
      //@ts-ignore
      user_id: `${newUSer.id}`,
      quantity: 2,
      status: "active",
    });
  });
  it("placeOrder handler works properly", async () => {
    const result = await store.placeOrder({
      //@ts-ignore
      user_id: `${newUSer.id}`,
      //@ts-ignore
      order_id: `${newOrder.id}`,
      //@ts-ignore
      product_id: `${newProduct.id}`,
    });
    expect(result).toEqual({
      id: result.id,
      //@ts-ignore
      user_id: `${newUSer.id}`,
      //@ts-ignore
      order_id: `${newOrder.id}`,
      //@ts-ignore
      product_id: `${newProduct.id}`,
    });
  });
});
