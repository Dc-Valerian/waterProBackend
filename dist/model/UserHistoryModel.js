"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const historySchema = new mongoose_1.default.Schema({
    message: {
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
    referrenceNumber: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    DateOfOrder: {
        type: String
    },
});
const UserhistoryModel = mongoose_1.default.model("history", historySchema);
exports.default = UserhistoryModel;
