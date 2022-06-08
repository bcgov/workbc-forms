import * as express from "express"
import * as commonController from "../controllers/common.controller"

const router = express.Router()

router.get("/UserPermissions/:idp", commonController.getUserPermissions)
router.get("/CatchmentInfo/:catchment", commonController.getCatchmentInfo)
router.get("/Catchments", commonController.getCatchments)

export default router
