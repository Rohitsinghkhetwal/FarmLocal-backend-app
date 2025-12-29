import express from "express"
import { webhookApi } from "../../external/apiB"

const router = express.Router()

router.post("/", webhookApi)

export default router