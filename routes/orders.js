import express from "express";
import { createOrder } from "../controllers/orderController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, createOrder);

export default router;
