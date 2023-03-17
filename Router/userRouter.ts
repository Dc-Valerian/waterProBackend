import { LoginUser,RegisterUser,OrderPureWater,OrderBottleWater,MessageAdmin } from "../Controller/userController";
import { Router } from "express";
import Upload from "../multer/multer";
const router = Router();

router.route("/register").post(Upload,RegisterUser)
router.route("/login").post(LoginUser)
router.route("/order/:userId").patch(OrderPureWater)
router.route("/orderbottle/:userId").patch(OrderBottleWater)
router.route("/message/:id/:admin").post(MessageAdmin)

export default router
