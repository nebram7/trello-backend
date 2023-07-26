
import { auth } from "../../middleware/authentication.js"
import { validation } from "../../middleware/validation.js"
import * as validators from "./validation .js"
import * as userController from "./controller/user.js"
import {Router} from "express"
const router = Router()

router.get("/", auth, userController.getUsers)
router.patch("/changePassword",validation(validators.changPassword) ,auth, userController.changPassword)
router.put("/updateUser",validation(validators.updateUser), auth, userController.updateUser)
router.delete("/deleteUser", auth, userController.deleteUser)
router.patch("/logout", auth, userController.logout)
router.patch("/softDelete", auth, userController.softDelete)



export default router