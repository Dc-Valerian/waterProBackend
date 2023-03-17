"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URI = "mongodb://127.0.0.1/WaterProject";
mongoose_1.default.connect(URI);
mongoose_1.default.connection.on("open", () => {
    console.log("db is on");
}).once("error", () => {
    console.log("an error occ");
});
