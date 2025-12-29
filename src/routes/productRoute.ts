
import express from "express"
import { products } from "../controller/product.controller"

const router = express.Router()

router.get("/v1", products)

export default router