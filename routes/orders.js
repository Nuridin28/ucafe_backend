import express from "express";
import {
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getCafeOrders,
} from "../controllers/orderController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getAllOrders);

router.get("/:orderId", checkAuth, getOrderById);

router.get("/cafe/:cafeId/status/:orderStatus", checkAuth, getCafeOrders);

router.post("/", checkAuth, createOrder);

router.put("/:orderId", checkAuth, updateOrderStatus);

router.delete("/:orderId", checkAuth, deleteOrder);

export default router;
