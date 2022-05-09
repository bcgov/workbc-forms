import * as express from "express"
import * as submissionController from "../controllers/submission.controller"

const router = express.Router()

router.post("/submissions", submissionController.getSubmission)
router.post("/information", submissionController.checkingToken)

export default router
