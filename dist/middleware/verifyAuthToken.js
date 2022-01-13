"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    var secret = process.env.TOKEN_SECRET;
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(" ")[1];
        var decoded = jsonwebtoken_1["default"].verify(token, secret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("error, ..Invalid token");
    }
};
exports["default"] = verifyAuthToken;
