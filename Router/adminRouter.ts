import { LoginAdmin,RegisterAdmin,PostBottleWater,PostPureWater } from "../Controller/adminController";
import { Router } from "express";
import Upload from "../multer/multer";
const router = Router();

router.route("/register").post(RegisterAdmin)
router.route("/login").post(LoginAdmin)
router.route("/bottlewater/:id").patch(PostBottleWater)
router.route("/purewater/:id").patch(PostPureWater)

export default router
