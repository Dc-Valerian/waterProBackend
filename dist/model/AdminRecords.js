"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RecordSchema = new mongoose_1.default.Schema({
    date: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    pureWaterTotalAmount: {
        type: Number
    },
    pureWaterTotalProduct: {
        type: Number
    },
    bottleWaterTotalAmount: {
        type: Number
    },
    bottleWaterTotalProduct: {
        type: Number
    },
    returnProduct: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId
        }
    ]
});
const RecordsModel = mongoose_1.default.model("records", RecordSchema);
exports.default = RecordsModel;
