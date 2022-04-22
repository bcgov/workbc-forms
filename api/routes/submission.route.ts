import * as express from "express"
import * as submissionController from "../controllers/submission.controller"

const router = express.Router()

router.post("/submissions", submissionController.getSubmission)
router.get("/test", submissionController.anotherFunction)

export default router
