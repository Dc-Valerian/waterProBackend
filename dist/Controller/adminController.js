"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProducts = exports.MessageUser = exports.PostPureWater = exports.PostBottleWater = exports.LoginAdmin = exports.RegisterAdmin = void 0;
const AdminModel_1 = __importDefault(require("../model/AdminModel"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const bottleWaterModel_1 = __importDefault(require("../model/bottleWaterModel"));
const pureWaterModel_1 = __importDefault(require("../model/pureWaterModel"));
const UsermessageModel_1 = __importDefault(require("../model/UsermessageModel"));
const RegisterAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, password, bottleWaterQty, bottleWaterAmount, pureWaterQty, pureWaterAmount } = req.body;
        const genAccountNumber = Math.floor(Math.random() * 60) * Math.floor(Math.random() * 60) + 1234;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const reg = yield AdminModel_1.default.create({
            name,
            email,
            password: hash,
            balance: 1000,
            accountNumber: genAccountNumber,
        });
        const createBottle = yield bottleWaterModel_1.default.create({
            _id: reg._id,
            bottleWaterQty,
            bottleWaterAmount,
            // Totalamount:bottleWaterAmount * bottleWaterQty,
        });
        (_a = reg === null || reg === void 0 ? void 0 : reg.bottleWater) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(createBottle === null || createBottle === void 0 ? void 0 : createBottle._id));
        reg === null || reg === void 0 ? void 0 : reg.save();
        const createpureWater = yield pureWaterModel_1.default.create({
            _id: reg._id,
            pureWaterQty,
            pureWaterAmount,
            Totalamount: 0,
        });
        (_b = reg === null || reg === void 0 ? void 0 : reg.pureWater) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(createpureWater === null || createpureWater === void 0 ? void 0 : createpureWater._id));
        reg === null || reg === void 0 ? void 0 : reg.save();
        return res.status(201).json({
            message: `Admin Created ${reg.name}`,
            data: reg,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "user not created"
        });
    }
});
exports.RegisterAdmin = RegisterAdmin;
const PostPureWater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bottleWaterQty, bottleWaterAmount, Totalamount } = req.body;
        const sth = yield pureWaterModel_1.default.findById(req.params.id);
        const updateBottle = yield pureWaterModel_1.default.findByIdAndUpdate(sth === null || sth === void 0 ? void 0 : sth._id, {
            bottleWaterQty,
            bottleWaterAmount,
            Totalamount: bottleWaterQty * bottleWaterAmount,
        });
        return res.status(200).json({
            message: "bottle water updated",
            data: updateBottle,
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "an error occured"
        });
    }
});
exports.PostPureWater = PostPureWater;
const PostBottleWater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bottleWaterQty, bottleWaterAmount, Totalamount } = req.body;
        const sth = yield bottleWaterModel_1.default.findById(req.params.id);
        const updateBottle = yield bottleWaterModel_1.default.findByIdAndUpdate(sth === null || sth === void 0 ? void 0 : sth._id, {
            bottleWaterQty,
            bottleWaterAmount,
            Totalamount: bottleWaterQty * bottleWaterAmount,
        });
        return res.status(200).json({
            message: "bottle water updated",
            data: updateBottle,
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "an error occured"
        });
    }
});
exports.PostBottleWater = PostBottleWater;
const LoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getEmail = yield AdminModel_1.default.findOne({ email });
        if (getEmail) {
            return res.status(200).json({
                message: `Welcome back ${getEmail.name}`,
                data: getEmail
            });
        }
        else {
            return res.status(400).json({
                message: "email or password is incorrect",
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: "an error occured"
        });
    }
});
exports.LoginAdmin = LoginAdmin;
const MessageUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { time, text, profileImage } = req.body;
        const user = yield UserModel_1.default.findById(req.params.id);
        const admin = yield AdminModel_1.default.findById(req.params.admin);
        const dater = new Date().toDateString();
        if (user) {
            const messages = yield UsermessageModel_1.default.create({
                time: dater,
                text,
            });
            (_c = user === null || user === void 0 ? void 0 : user.message) === null || _c === void 0 ? void 0 : _c.push(new mongoose_1.default.Types.ObjectId(messages === null || messages === void 0 ? void 0 : messages._id));
            user === null || user === void 0 ? void 0 : user.save();
            (_d = admin === null || admin === void 0 ? void 0 : admin.message) === null || _d === void 0 ? void 0 : _d.push(new mongoose_1.default.Types.ObjectId(messages === null || messages === void 0 ? void 0 : messages._id));
            admin === null || admin === void 0 ? void 0 : admin.save();
            return res.status(200).json({
                messageee: "message sent",
            });
        }
        else {
            return res.status(401).json({
                message: "sth came up"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            messageee: "cant send message"
        });
    }
});
exports.MessageUser = MessageUser;
const GetAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllProduct = yield bottleWaterModel_1.default.find();
        return res.status(200).json({
            message: "Successfully got all Products",
            data: getAllProduct
        });
    }
    catch (error) {
        return res.status(404).json({
            messageee: "Couldn't Get Products"
        });
    }
});
exports.GetAllProducts = GetAllProducts;
