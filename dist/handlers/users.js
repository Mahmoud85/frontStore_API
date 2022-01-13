"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var users_1 = __importDefault(require("../models/users"));
var verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
var store = new users_1["default"]();
var envToken = process.env.TOKEN_SECRET;
var usersHandler = /** @class */ (function () {
    function usersHandler() {
        var _this = this;
        this.userRoutes = function (app) {
            // no Access token validation for this method as user didn't have token yet
            app.post("/register", _this.create);
            app.post("/login", _this.login);
            app.get("/users", verifyAuthToken_1["default"], _this.index);
            app.get("/users/:id", verifyAuthToken_1["default"], _this.show);
        };
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, first_name, last_name, password, newUser, candidateUser, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, first_name = _a.first_name, last_name = _a.last_name, password = _a.password;
                        newUser = {
                            email: email,
                            first_name: first_name,
                            last_name: last_name,
                            password: password
                        };
                        if (!(email && first_name && last_name && password)) {
                            res
                                .status(400)
                                .json({ errorMsg: "Invalid request,.. required data is missing" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, store.findByMail(email)];
                    case 1:
                        candidateUser = _b.sent();
                        if ((candidateUser === null || candidateUser === void 0 ? void 0 : candidateUser.email) === email) {
                            res.status(400);
                            res.json({
                                errorMsg: "This email already exists , please go to login"
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, store.create(newUser)];
                    case 2:
                        _b.sent();
                        token = jsonwebtoken_1["default"].sign({ userId: email }, envToken);
                        res.status(200);
                        res.json({
                            msg: "user ".concat(first_name, " ").concat(last_name, " has been created successfully"),
                            access_token: token
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        res.status(500);
                        res.json({ errorMsg: "internal server error" + error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, isValidLogin, token, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, store.authenticate(email, password)];
                    case 1:
                        isValidLogin = _b.sent();
                        if (isValidLogin) {
                            token = jsonwebtoken_1["default"].sign({ userId: email }, envToken);
                            res.json({ access_token: token });
                        }
                        else {
                            res.status(401);
                            res.json("Error: invalid credentials");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        res.status(401);
                        res.json("Invalid credentials");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.index = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, store.index()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2 /*return*/];
                }
            });
        }); };
        this.show = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, store.show(id)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            res.status(200);
                            res.json(user);
                        }
                        else {
                            res.status(404);
                            res.json({ error: "user with id ".concat(id, " could not be found") });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return usersHandler;
}());
exports["default"] = usersHandler;
