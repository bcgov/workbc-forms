import * as express from "express"
import * as formsCreated from "../controllers/formsCreated.controller"

const router = express.Router()

router.get("/", formsCreated.getFormsCreated)
router.post("/", formsCreated.createForm)

export default router
