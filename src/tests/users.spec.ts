import supertest from "supertest";
import app from "../server";
import userStore from "../models/users";

const store = new userStore();
let testId: number;

describe("test users models", () => {
  describe("do methods exists", () => {
    it("Create Method Should Exist", () => {
      expect(store.create).toBeDefined();
    });
    it("Index Method Should Exist", () => {
      expect(store.index).toBeDefined();
    });
    it("Show Method Should Exist", () => {
      expect(store.show).toBeDefined();
    });
  });

  describe("test database methods", () => {
    let userID: number;
    it("Create new User in Database", async () => {
      const result = await store.create({
        email: "mahmoud@mail.com",
        first_name: "User",
        last_name: "Test",
        password: "password",
      });
      delete result.password;
      testId = result.id as number;
      expect(result).toEqual({
        id: testId,
        email: "mahmoud@mail.com",
        first_name: "User",
        last_name: "Test",
      });
    });
    beforeAll(async () => {
      const _result = await store.create({
        email: "testSingleUSer@mail.com",
        first_name: "User",
        last_name: "Test",
        password: "password",
      });
      delete _result.password;
      userID = _result.id as unknown as number;
    });
    it("Retrieve Single User in Database", async () => {
      const result = await store.show(`${userID}`);
      delete result.password;
      expect(result).toEqual({
        id: userID,
        email: "testSingleUSer@mail.com",
        first_name: "User",
        last_name: "Test",
      });
    });
  });
});

describe("test users handler", () => {
  const authUser = {
    email: "mahmoud@mail.com",
    password: "test123",
    fist_name: "mahmoud",
    last_name: "fathy",
  };
  let token: string;
  beforeAll(async () => {
    const userForAuth = await request.post("/register").send(authUser);
    token = userForAuth.body.token;
  });

  const request = supertest(app);
  describe("Register new user", () => {
    it("should fail if any param is missing", async () => {
      const response = await request
        .post("/register")
        .send({ firstname: "failingTest", lastname: "failingTest" });
      expect(response.status).toEqual(400);
      expect(response.body.errorMsg).toEqual(
        "Invalid request,.. required data is missing"
      );
    });
    const registerPylaod = {
      email: "mahmoudReg@mail.com",
      first_name: "mahmoud",
      last_name: "fathy",
      password: "test123",
    };
    it("should create a new user", async () => {
      const response = await request.post("/register").send(registerPylaod);
      expect(response.status).toEqual(200);
      expect(response.body.access_token).toBeDefined();
    });
  });

  describe("login Sucessfully", () => {
    const user = {
      email: "mahmouNewTest@mail.com",
      first_name: "mahmoud",
      last_name: "fathy",
      password: "test123",
    };
    beforeAll(async () => {
      const userSignup = await request.post("/register").send(user);
    });

    it("should login succesfully", async () => {
      const response = await request
        .post("/login")
        .send({ email: user.email, password: user.password });
      expect(response.status).toEqual(200);
      expect(response.body.access_token).toBeDefined();
    });
  });

  describe("retrieve users", () => {
    const user = {
      email: "mahmoudRetrieval@mail.com",
      first_name: "mahmoud",
      last_name: "fathy",
      password: "test123",
    };
    let access_token: string;
    beforeAll(async () => {
      const userSignup = await request.post("/register").send(user);
      access_token = userSignup.body.access_token;
    });

    it("should retrieve user by id", async () => {
      const response = await request
        .get("/users/1")
        .set({ Authorization: `Bearer ${access_token}` });
      expect(response.status).toEqual(200);
    });
    it("should retrieve all users", async () => {
      const response = await request
        .get("/users")
        .set({ Authorization: `Bearer ${access_token}` });
      expect(response.status).toEqual(200);
    });
  });
});
