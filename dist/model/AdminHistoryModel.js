"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const historySchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    pureWater: {
        type: String
    },
    bottleWater: {
        type: String
    },
    quantityProduct: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
});
const AdminhistoryModel = mongoose_1.default.model("history", historySchema);
exports.default = AdminhistoryModel;
