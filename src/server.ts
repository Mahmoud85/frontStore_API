import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import usersHandler from "./handlers/users";
import productsHandle from "./handlers/products";
import OrdersHandler from "./handlers/orders";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// HTTP request logger middleware
app.use(morgan("common"));
// HTTP security middleware headers
app.use(helmet());
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // Limit each IP to 30 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requestes detected",
  })
);
// http security cors
const corsOptions = {
  origin: "http://localhost",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const _usersHandler = new usersHandler();
const _productsHandle = new productsHandle();
const _OrdersHandler = new OrdersHandler();

app.get("/", function (req: Request, res: Response) {
  res.send(
    "StoreFront is up. API is ready for use. Please access the correct endpoint."
  );
});
_usersHandler.userRoutes(app);
_productsHandle.productRoutes(app);
_OrdersHandler.orderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
