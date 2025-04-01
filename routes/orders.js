import express from "express";
import {
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/orderController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getAllOrders);

router.get("/:orderId", checkAuth, getOrderById);

router.post("/", checkAuth, createOrder);

router.put("/:orderId", checkAuth, updateOrderStatus);

router.delete("/:orderId", checkAuth, deleteOrder);

export default router;
