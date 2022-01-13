import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.TOKEN_SECRET as unknown as string;
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401);
    res.json("error, ..Invalid token");
  }
};

export default verifyAuthToken;
