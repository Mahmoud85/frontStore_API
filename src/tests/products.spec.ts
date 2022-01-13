import ProductStore, { Product } from "../models/products";
import supertest from "supertest";
import app from "../server";

const store = new ProductStore();
const request = supertest(app);
let testId: number;
describe("Products methods exists", () => {
  it("Create Method Should Exist", () => {
    expect(store.create).toBeDefined();
  });
  it("Index Method Should Exist", () => {
    expect(store.index).toBeDefined();
  });
  it("Show Method Should Exist", () => {
    expect(store.show).toBeDefined();
  });
  it("Create new Product in Database", async () => {
    const result = await store.create({
      name: "orange",
      price: 1,
      category: "fruit",
    });
    expect(result).toEqual({
      id: result.id,
      name: "orange",
      price: 1,
      category: "fruit",
    });
  });
  beforeAll(async () => {
    const result = await store.create({
      name: "orange",
      price: 1,
      category: "fruit",
    });
    testId = result.id as number;
  });
  it("Retrieve Single Product in Database", async () => {
    const result = await store.show(`${testId}`);

    expect(result).toEqual({
      id: testId,
      name: "orange",
      price: 1,
      category: "fruit",
    });
  });
});

describe("test products handler", () => {
  const user = {
    email: "productsHandler@mail.com",
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
      .post("/products/addnew")
      .send(product)
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });
  it("should be able to create new product", async () => {
    const response = await request
      .post("/products/addnew")
      .send(product)
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });

  it("should retrieve single product by id", async () => {
    const response = await request
      .get("/products/1")
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });
  it("should retrieve all products", async () => {
    const response = await request
      .get("/products")
      .set({ Authorization: `Bearer ${access_token}` });
    expect(response.status).toEqual(200);
  });
});
