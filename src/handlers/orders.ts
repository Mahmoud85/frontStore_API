import express, { Request, Response, NextFunction } from "express";
import OrdersStore, { OrderProduct } from "../models/orders";
import ordersServices from "../services/orderStatus";
import verifyAuthToken from "../middleware/verifyAuthToken";

const store = new OrdersStore();
const services = new ordersServices();
export default class OrdersHandler {
  orderRoutes = (app: express.Application) => {
    app.post("/orders/addnew", verifyAuthToken, this.create);
    app.get("/orders/:id/active", verifyAuthToken, this.getActive);
    app.get("/orders/:id/complete", verifyAuthToken, this.getComplete);
    app.post("/orders/:id/placeOrder", verifyAuthToken, this.addOrderProduct);
  };

  getActive = async (req: Request, res: Response) => {
    const order = await services.getActiveOrdersPerUser(req.params.id);
    res.json(order);
  };

  getComplete = async (req: Request, res: Response) => {
    const orders = await services.getCompoeteOrdersPerUser(req.params.id);
    res.json(orders);
  };

  create = async (req: Request, res: Response) => {
    try {
      const newOrder = {
        user_id: req.body.user_id,
        quantity: req.body.quantity,
        status: req.body.status,
      };
      const _newOrder = await store.create(newOrder);
      res.json({ msg: "Order created succesfully", _newOrder });
    } catch (error) {
      res.status(400);
      res.json({ errorMsg: "Order could't be creaed for " + error });
    }
  };

  addOrderProduct = async (req: Request, res: Response) => {
    console.log(req.params, req.body);
    try {
      const newOrder: OrderProduct = {
        user_id: req.params.id as unknown as number,
        order_id: req.body.order_id,
        product_id: req.body.product_id,
      };
      const placeProductOrder = await store.placeOrder(newOrder);
      res.json({
        msg: "order placed succesfully",
        order: placeProductOrder,
      });
    } catch (error) {
      res.status(400);
      res.json({ errorMsg: "couldn't place this order " + error });
    }
  };
}
