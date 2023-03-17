"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    time: {
        type: String
    },
    text: {
        type: String
    },
    profileImage: {
        type: String
    },
});
const AdminmessageModel = mongoose_1.default.model("messages", messageSchema);
exports.default = AdminmessageModel;
