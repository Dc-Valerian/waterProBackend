"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    profileImage: {
        type: String,
    },
    shopImage: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: [true, "please enter your phoneNumber"]
    },
    amount: {
        type: Number,
    },
    Address: {
        type: String,
        required: [true, "please enter your Address"]
    },
    bottleWater: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "bottleWater"
        }],
    pureWater: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "purewater"
        }],
    pureWaterQty: {
        type: Number,
        // required:[true,"please enter your pureWaterQty"]
    },
    pureWaterAmount: {
        type: Number,
        // required:[true,"please enter your pureWaterQty"]
    },
    Totalprice: {
        type: Number,
        // required:[true,"please enter your pureWaterQty"]
    },
    balance: {
        type: Number,
        // required:[true,"please enter your pureWaterQty"]
    },
    TotalSumOfTheDay: {
        type: Number,
        // required:[true,"please enter your pureWaterQty"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: true,
    },
    message: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "message"
        }
    ],
    history: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "history"
        }
    ],
    product: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    Records: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "records"
        }
    ],
}, { timestamps: true });
const userModel = mongoose_1.default.model("userModel", userSchema);
exports.default = userModel;
