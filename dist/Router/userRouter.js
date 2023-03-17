"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../Controller/userController");
const express_1 = require("express");
const multer_1 = __importDefault(require("../multer/multer"));
const router = (0, express_1.Router)();
router.route("/register").post(multer_1.default, userController_1.RegisterUser);
router.route("/login").post(userController_1.LoginUser);
router.route("/order/:userId").patch(userController_1.OrderPureWater);
router.route("/orderbottle/:userId").patch(userController_1.OrderBottleWater);
router.route("/message/:id/:admin").post(userController_1.MessageAdmin);
exports.default = router;
