import * as express from "express"
import * as commonController from "../controllers/common.controller"

const router = express.Router()

router.get("/UserPermissions", commonController.getUserPermissions)

export default router
