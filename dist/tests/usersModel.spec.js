"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
describe("User Controller", () => {
    const authUser = {
        email: "mahmoud@mail.com",
        password: "test123",
        fist_name: "mahmoud",
        last_name: "fathy",
    };
    let token;
    beforeAll(async () => {
        const userForAuth = await request.post("/register").send(authUser);
        token = userForAuth.body.token;
    });
    const request = supertest_1.default(server_1.default);
    describe("Register new user", () => {
        it("should fail if any param is missing", async () => {
            const response = await request
                .post("/register")
                .send({ firstname: "failingTest", lastname: "failingTest" });
            expect(response.status).toEqual(400);
            expect(response.body.errorMsg).toEqual("Invalid request,.. required data is missing");
        });
        const registerPylaod = {
            email: "mahmoud@mail2.com",
            first_name: "mahmoud",
            last_name: "fathy",
            password: "test123",
        };
        it("should create a new user", async () => {
            const response = await request.post("/register").send(registerPylaod);
            expect(response.status).toEqual(200);
            expect(response.body.token).toBeDefined();
        });
    });
    describe("login Sucessfully", () => {
        const credentials = { email: "mahmoud@mail.com", password: "test123" };
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
    // describe("All Users", () => {
    //   it("should return all users in the db", async () => {
    //     const response = await request
    //       .get("/ausers/all")
    //       .set({ Authorization: `Bearer ${token}` });
    //     expect(response.status).toEqual(200);
    //     expect(response.body.users).toBeDefined();
    //   });
    // });
    // describe("Single User", () => {
    //   it("should fetch a single user by id", async () => {
    //     const response = await request
    //       .get("/users/1")
    //       .set({ Authorization: `Bearer ${token}` });
    //     expect(response.status).toEqual(200);
    //     expect(response.body.user).toBeDefined();
    //   });
    // });
});
