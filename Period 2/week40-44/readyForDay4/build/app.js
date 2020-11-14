"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const apiError_1 = require("./errors/apiError");
//import { requestLogger, errorLogger } from "./middlewares/logger";
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
// app.use(requestLogger)
app.use(express_1.default.json());
//const userAPIRouter = require('./routes/userApi');
const userAPIRouter = require('./routes/userApiDB');
app.get("/api/dummy", (req, res) => {
    res.json({ msg: "Hello" });
});
app.use("/api/users", userAPIRouter);
// app.use(errorLogger)
//404 handler
app.use(function (req, res, next) {
    if (req.originalUrl.startsWith("/api")) {
        res.status(404).json({ code: 404, msg: "this API does not contanin this endpoint" });
    }
    next();
});
app.use(function (err, req, res, next) {
    //if(err.name === "ApiError"){
    if (err instanceof (apiError_1.ApiError)) {
        const e = err;
        res.status(e.errorCode).send({ code: e.errorCode, message: e.message });
    }
    next(err);
});
const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);
console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;
//# sourceMappingURL=app.js.map