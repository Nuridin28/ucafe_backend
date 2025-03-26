import express from "express";
import { createCafe, deleteCafe, updateCafe, getAllCafes } from "../controllers/cafeController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

// Получить список всех кафе
router.get("/", getAllCafes);

// Создать кафе (можно закрыть checkAuth, если доступно только админу)
router.post("/", checkAuth, createCafe);

// Удалить кафе
router.delete("/:id", checkAuth, deleteCafe);

// Обновить кафе
router.patch("/:id", checkAuth, updateCafe);

export default router;
