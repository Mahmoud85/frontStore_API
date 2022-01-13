"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
// HTTP request logger middleware
app.use((0, morgan_1["default"])("common"));
// HTTP security middleware headers
app.use((0, helmet_1["default"])());
// Apply the rate limiting middleware to all requests
app.use((0, express_rate_limit_1["default"])({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requestes detected"
}));
// http security cors
var corsOptions = {
    origin: "http://localhost",
    optionsSuccessStatus: 200
};
app.use((0, cors_1["default"])(corsOptions));
var _usersHandler = new users_1["default"]();
var _productsHandle = new products_1["default"]();
app.get("/", function (req, res) {
    res.send("StoreFront is up. API is ready for use. Please access the correct endpoint.");
});
_usersHandler.userRoutes(app);
_productsHandle.productRoutes(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
