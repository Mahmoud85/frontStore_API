import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserStore, { User } from "../models/users";
import verifyAuthToken from "../middleware/verifyAuthToken";

const store = new UserStore();
const envToken = process.env.TOKEN_SECRET as string;

export default class usersHandler {
  userRoutes = (app: express.Application) => {
    // no Access token validation for this method as user didn't have token yet
    app.post("/register", this.create);
    app.post("/login", this.login);
    app.get("/users", verifyAuthToken, this.index);
    app.get("/users/:id", verifyAuthToken, this.show);
  };

  create = async (req: Request, res: Response) => {
    try {
      const { email, first_name, last_name, password } = req.body;
      const newUser: User = {
        email,
        first_name,
        last_name,
        password,
      };
      if (!(email && first_name && last_name && password)) {
        res
          .status(400)
          .json({ errorMsg: "Invalid request,.. required data is missing" });
        return;
      }
      const candidateUser = await store.findByMail(email);
      if (candidateUser?.email === email) {
        res.status(400);
        res.json({
          errorMsg: "This email already exists , please go to login",
        });
        return;
      }
      await store.create(newUser);
      const token = jwt.sign({ userId: email }, envToken);
      res.status(200);
      res.json({
        msg: `user ${first_name} ${last_name} has been created successfully`,
        access_token: token,
      });
    } catch (error) {
      res.status(500);
      res.json({ errorMsg: "internal server error" + error });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const isValidLogin = await store.authenticate(email, password);
      if (isValidLogin) {
        const token = jwt.sign({ userId: email }, envToken);
        res.json({ access_token: token });
      } else {
        res.status(401);
        res.json("Error: invalid credentials");
      }
    } catch (error) {
      res.status(401);
      res.json("Invalid credentials");
    }
  };

  index = async (req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
  };

  show = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await store.show(id);
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(404);
      res.json({ error: `user with id ${id} could not be found` });
    }
  };
}
