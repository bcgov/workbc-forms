import * as express from "express"
import generatePDF from "../controllers/pdf.controller"

const router = express.Router()

router.get("/pdf/:id", generatePDF)

export default router
