"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    bottleWaterQty: {
        type: Number,
        default: 0,
    },
    bottleWaterAmount: {
        type: Number,
        default: 0,
    },
    Totalamount: {
        type: Number,
        default: 0,
    },
});
const BottlewaterproductModel = mongoose_1.default.model("bottleWater", productSchema);
exports.default = BottlewaterproductModel;
