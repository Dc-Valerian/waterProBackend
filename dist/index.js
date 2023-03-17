"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./Router/userRouter"));
const adminRouter_1 = __importDefault(require("./Router/adminRouter"));
const morgan_1 = __importDefault(require("morgan"));
const PORT = 2244;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", () => {
    console.log("get method is working");
});
require("./config/db");
app.use("/api", userRouter_1.default);
app.use("/api/admin", adminRouter_1.default);
app.use((0, morgan_1.default)("dev"));
app.listen(PORT, () => {
    console.log("server is up on.....");
});
