import orderStore, { Order } from "../models/orders";
import orderStatus from "../services/orderStatus";
import supertest from "supertest";
import app from "../server";

const store = new orderStore();
const ordersStatusStore = new orderStatus();
const request = supertest(app);
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
