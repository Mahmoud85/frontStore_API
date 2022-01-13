import orderStore, { Order } from "../models/orders";
import orderStatus from "../services/orderStatus";
import supertest from "supertest";
import app from "../server";

const store = new orderStore();
const ordersStatusStore = new orderStatus();
const request = supertest(app);

const getOrderType = (completed: boolean) => ({
  user_id: 1,
  product_id: 1,
  quantity: 3,
  status: completed ? "complete" : "active",
});
describe("Orders methods exists", () => {
  it("Create Method Should Exist", () => {
    expect(store.create).toBeDefined();
  });
  it("Index Method Should Exist", () => {
    expect(store.index).toBeDefined();
  });
  it("Show Method Should Exist", () => {
    expect(store.show).toBeDefined();
  });
  it("Get active orders method exists", () => {
    expect(ordersStatusStore.getActiveOrdersPerUser).toBeDefined();
  });
  it("Get complete orders method exists", () => {
    expect(ordersStatusStore.getCompoeteOrdersPerUser).toBeDefined();
  });
});

describe("test orders handlers", () => {
  const user = {
    email: "usetsHandler@mail.com",
    first_name: "mahmoud",
    last_name: "fathy",
    password: "test123",
  };
  const product = {
    name: "Nissan Qashqai",
    price: "500000",
    category: "SUV car",
  };
  let access_token: string;
  beforeAll(async () => {
    const userSignup = await request.post("/register").send(user);
    access_token = userSignup.body.access_token;
  });

  beforeAll(async () => {
    const response = await request
      // add new product as it is referenced by orders table
      .post("/products/addnew")
      .send(product)
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });
  it("should create new order with complete flag", async () => {
    const response = await request
      .post("/orders/addnew")
      .send(getOrderType(false))
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });
  it("should create new order with active flag", async () => {
    const response = await request
      .post("/orders/addnew")
      .send(getOrderType(true))
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });

  it("should retrive active orders for this user", async () => {
    const response = await request
      .get("/orders/1/active")
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });
  it("should retrive complete orders for this user", async () => {
    const response = await request
      .get("/orders/2/complete")
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });
});
