import { LoginUser,RegisterUser,OrderPureWater,OrderBottleWater } from "../Controller/userController";
import { Router } from "express";
import Upload from "../multer/multer";
const router = Router();

router.route("/register").post(Upload,RegisterUser)
router.route("/login").post(LoginUser)
router.route("/order/:userId").patch(OrderPureWater)
router.route("/orderbottle/:userId").patch(OrderBottleWater)

export default router
