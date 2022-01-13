import express, { Request, Response, NextFunction } from "express";
import ProductStore, { Product } from "../models/products";
import verifyAuthToken from "../middleware/verifyAuthToken";

const store = new ProductStore();

export default class productsHandle {
  productRoutes = (app: express.Application) => {
    app.get("/products", verifyAuthToken, this.index);
    app.get("/products/:id", verifyAuthToken, this.show);
    app.post("/products/addnew", verifyAuthToken, this.create);
  };

  index = async (req: Request, res: Response) => {
    const products = await store.index();
    res.json({ products });
  };

  show = async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await store.show(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      res.json({ errorMsg: `product with id ${id} couldn't be found` });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newProduct: Product = {
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body?.category,
      };
      const product = await store.create(newProduct);
      res.json({ msg: "product has been added succesfully", product });
    } catch (error) {
      res.status(400);
      res.json({ errorsg: error });
    }
  };
}
