import * as express from "express"
import provider from "../controllers/provider.controller"

const router = express.Router()

router.get("/:key", provider)

export default router
