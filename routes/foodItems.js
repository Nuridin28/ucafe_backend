import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import * as FoodItemController from "../controllers/FoodItemController.js";

const router = express.Router();

router.post("/", checkAuth, FoodItemController.createFoodItem);

export default router;
