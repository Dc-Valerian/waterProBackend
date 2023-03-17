import { LoginAdmin,RegisterAdmin,PostBottleWater,PostPureWater,MessageUser, GetAllProducts } from "../Controller/adminController";
import { Router } from "express";
import Upload from "../multer/multer";
const router = Router();

router.route("/register").post(RegisterAdmin)
router.route("/login").post(LoginAdmin)
router.route("/getallproducts").get(GetAllProducts)
router.route("/bottlewater/:id").patch(PostBottleWater)
router.route("/purewater/:id").patch(PostPureWater)
router.route("/message/:id/:admin").post(MessageUser)

export default router
