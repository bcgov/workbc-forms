import * as express from "express"
import client from "../controllers/client.controller"

const router = express.Router()

router.get("/:key", client)

export default router
