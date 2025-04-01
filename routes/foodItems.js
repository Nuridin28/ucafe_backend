import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import * as FoodItemController from "../controllers/FoodItemController.js";

const router = express.Router();

router.get("/", FoodItemController.getAllFoodItems);

router.get("/:foodId", FoodItemController.getFoodItemById);

router.get("/cafe/:cafeId", FoodItemController.getFoodItemsByCafe);

router.post("/", checkAuth, FoodItemController.createFoodItem);

router.put("/:foodId", checkAuth, FoodItemController.updateFoodItem);

router.delete("/:foodId", checkAuth, FoodItemController.deleteFoodItem);

export default router;
