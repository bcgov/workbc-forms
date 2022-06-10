import * as express from "express"
import * as formsCreated from "../controllers/formsCreated.controller"

const router = express.Router()

router.get("/", formsCreated.getFormsCreated)
router.post("/", formsCreated.createForm)
router.delete("/:id", formsCreated.deleteForm)
router.put("/:id", formsCreated.updateForm)

export default router
