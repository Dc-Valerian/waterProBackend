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
exports.MessageAdmin = exports.OrderBottleWater = exports.OrderPureWater = exports.LoginUser = exports.RegisterUser = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const AdminModel_1 = __importDefault(require("../model/AdminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const bottleWaterModel_1 = __importDefault(require("../model/bottleWaterModel"));
const bottleWaterModel_2 = __importDefault(require("../model/bottleWaterModel"));
const userBottleWater_1 = __importDefault(require("../model/userBottleWater"));
const UserHistoryModel_1 = __importDefault(require("../model/UserHistoryModel"));
const UsermessageModel_1 = __importDefault(require("../model/UsermessageModel"));
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOne = UserModel_1.default.findById(req.params.id).populate({ path: "userModel" });
        return res.status(200).json({
            message: "Successfully got one user",
            data: getOne
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Couldn't get single user"
        });
    }
});
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password, phoneNumber, Address } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const genId = Math.floor(Math.random() * 20) + "qdft";
        // const cloudinary = await cloud.uploader?.upload(req?.file?.path)
        const reg = yield UserModel_1.default.create({
            name,
            email,
            password: hash,
            phoneNumber,
            Address,
            // profileImage : req.file?.path,
            balance: 1000,
        });
        const user = yield userBottleWater_1.default.create({
            _id: reg === null || reg === void 0 ? void 0 : reg._id,
            pureWaterQty: 0,
            pureWaterAmount: 0,
            Totalamount: 0,
        });
        (_a = reg === null || reg === void 0 ? void 0 : reg.bottleWater) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id));
        reg === null || reg === void 0 ? void 0 : reg.save();
        return res.status(201).json({
            message: "user created",
            data: reg,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "user not created",
            data: error
        });
    }
});
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getEmail = yield UserModel_1.default.findOne({ email });
        const getPassword = yield UserModel_1.default.findOne({ password });
        if (getEmail) {
            return res.status(200).json({
                message: `welcome back ${getEmail.name}`,
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
exports.LoginUser = LoginUser;
const OrderPureWater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { accountNumber, bottleWaterQty, bottleWaterAmount } = req.body;
        const users = yield UserModel_1.default.findById(req.params.userId);
        const admin = yield AdminModel_1.default.findOne({ accountNumber });
        const adminBottle = yield bottleWaterModel_2.default.findById(admin === null || admin === void 0 ? void 0 : admin._id);
        const userBottle = yield userBottleWater_1.default.findById(users === null || users === void 0 ? void 0 : users._id);
        const dater = new Date();
        const refNumber = Math.floor(Math.random() * 12329393) + 12234455;
        if (users) {
            if ((users === null || users === void 0 ? void 0 : users.balance) < (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount) * bottleWaterQty) {
                return res.status(404).json({
                    message: "insufficient fund or quantity is not available"
                });
            }
            else {
                if (bottleWaterQty <= (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterQty)) {
                    yield AdminModel_1.default.findByIdAndUpdate(admin === null || admin === void 0 ? void 0 : admin._id, {
                        balance: (admin === null || admin === void 0 ? void 0 : admin.balance) + (bottleWaterQty * (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount))
                    });
                    yield bottleWaterModel_2.default.findByIdAndUpdate(adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle._id, {
                        bottleWaterQty: (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterQty) - bottleWaterQty
                    });
                    yield UserModel_1.default.findByIdAndUpdate(users === null || users === void 0 ? void 0 : users._id, {
                        balance: (users === null || users === void 0 ? void 0 : users.balance) - (bottleWaterQty * (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount))
                    });
                    yield userBottleWater_1.default.create({
                        pureWaterQty: +bottleWaterQty,
                        bottleWaterAmount: adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount,
                        Totalamount: bottleWaterQty * (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount),
                    });
                    (_b = users === null || users === void 0 ? void 0 : users.bottleWater) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(userBottle === null || userBottle === void 0 ? void 0 : userBottle._id));
                    users === null || users === void 0 ? void 0 : users.save();
                    const historys = yield UserHistoryModel_1.default.create({
                        message: `${users === null || users === void 0 ? void 0 : users.name} you have successfully ordered for this product`,
                        quantityProduct: (userBottle === null || userBottle === void 0 ? void 0 : userBottle.bottleWaterQty) + bottleWaterQty,
                        totalPrice: bottleWaterQty * (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount),
                        DateOfOrder: dater,
                        referrenceNumber: refNumber,
                    });
                    (_c = users === null || users === void 0 ? void 0 : users.history) === null || _c === void 0 ? void 0 : _c.push(new mongoose_1.default.Types.ObjectId(historys === null || historys === void 0 ? void 0 : historys._id));
                    users === null || users === void 0 ? void 0 : users.save();
                    return res.status(200).json({
                        message: `goods successfully bought by ${users === null || users === void 0 ? void 0 : users.name}`,
                        data: userBottle,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "quantity is not available"
                    });
                }
            }
        }
        else {
            return res.status(404).json({
                message: "unauthorize user"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error
        });
    }
});
exports.OrderPureWater = OrderPureWater;
const OrderBottleWater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const { accountNumber, bottleWaterQty, bottleWaterAmount } = req.body;
        const users = yield UserModel_1.default.findById(req.params.userId);
        const admin = yield AdminModel_1.default.findOne({ accountNumber });
        const adminBottle = yield bottleWaterModel_1.default.findById(admin === null || admin === void 0 ? void 0 : admin._id);
        const userBottle = yield userBottleWater_1.default.findById(users === null || users === void 0 ? void 0 : users._id);
        const dater = new Date();
        const refNumber = Math.floor(Math.random() * 12329393) + 12234455;
        if (users) {
            if ((users === null || users === void 0 ? void 0 : users.balance) < (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount) * bottleWaterQty) {
                return res.status(404).json({
                    message: "insufficient fund or quantity is not available"
                });
            }
            else {
                if (bottleWaterQty <= (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterQty)) {
                    yield AdminModel_1.default.findByIdAndUpdate(admin === null || admin === void 0 ? void 0 : admin._id, {
                        balance: (admin === null || admin === void 0 ? void 0 : admin.balance) + (bottleWaterQty * (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount))
                    });
                    yield bottleWaterModel_1.default.findByIdAndUpdate(adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle._id, {
                        bottleWaterQty: (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterQty) - bottleWaterQty
                    });
                    yield UserModel_1.default.findByIdAndUpdate(users === null || users === void 0 ? void 0 : users._id, {
                        balance: (users === null || users === void 0 ? void 0 : users.balance) - (bottleWaterQty * (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount))
                    });
                    yield userBottleWater_1.default.create({
                        pureWaterQty: +bottleWaterQty,
                        bottleWaterAmount: adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount,
                        Totalamount: bottleWaterQty * (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount),
                    });
                    (_d = users === null || users === void 0 ? void 0 : users.bottleWater) === null || _d === void 0 ? void 0 : _d.push(new mongoose_1.default.Types.ObjectId(userBottle === null || userBottle === void 0 ? void 0 : userBottle._id));
                    users === null || users === void 0 ? void 0 : users.save();
                    const historys = yield UserHistoryModel_1.default.create({
                        message: `${users === null || users === void 0 ? void 0 : users.name} you have successfully ordered for this product`,
                        quantityProduct: (userBottle === null || userBottle === void 0 ? void 0 : userBottle.bottleWaterQty) + bottleWaterQty,
                        totalPrice: bottleWaterQty * (adminBottle === null || adminBottle === void 0 ? void 0 : adminBottle.bottleWaterAmount),
                        DateOfOrder: dater,
                        referrenceNumber: refNumber,
                    });
                    (_e = users === null || users === void 0 ? void 0 : users.history) === null || _e === void 0 ? void 0 : _e.push(new mongoose_1.default.Types.ObjectId(historys === null || historys === void 0 ? void 0 : historys._id));
                    users === null || users === void 0 ? void 0 : users.save();
                    return res.status(200).json({
                        message: `goods successfully bought by ${users === null || users === void 0 ? void 0 : users.name}`,
                        data: userBottle,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "quantity is not available"
                    });
                }
            }
        }
        else {
            return res.status(404).json({
                message: "unauthorize user"
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error
        });
    }
});
exports.OrderBottleWater = OrderBottleWater;
const MessageAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
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
            (_f = user === null || user === void 0 ? void 0 : user.message) === null || _f === void 0 ? void 0 : _f.push(new mongoose_1.default.Types.ObjectId(messages === null || messages === void 0 ? void 0 : messages._id));
            user === null || user === void 0 ? void 0 : user.save();
            (_g = admin === null || admin === void 0 ? void 0 : admin.message) === null || _g === void 0 ? void 0 : _g.push(new mongoose_1.default.Types.ObjectId(messages === null || messages === void 0 ? void 0 : messages._id));
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
exports.MessageAdmin = MessageAdmin;
