"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
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
        required: [true, "please enter your password"]
    },
    accountNumber: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true,
    },
    balance: {
        type: Number,
    },
    bottleWater: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "bottlewater"
        }],
    pureWater: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "purewater"
        }],
    Totalprice: {
        type: Number,
        // required:[true,"please enter your pureWaterQty"]
    },
    TotalSumOfTheDay: {
        type: Number,
        // required:[true,"please enter your pureWaterQty"]
    },
    AllRegisterUser: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "alluser"
        }],
    isAdmin: {
        type: Boolean,
        default: true,
    },
    deliverd: {
        type: Boolean,
        default: false,
    },
    message: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "messages"
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
    ReturnProduct: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "return"
        }
    ],
}, { timestamps: true });
const AdminModel = mongoose_1.default.model("adminModel", AdminSchema);
exports.default = AdminModel;
