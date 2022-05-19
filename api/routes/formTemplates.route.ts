import * as express from "express"
import * as formTemplatesController from "../controllers/formTemplates.controller"

const router = express.Router()

router.get("/", formTemplatesController.getFormTemplates)
router.get("/:id", formTemplatesController.getFormTemplateByID)

export default router
