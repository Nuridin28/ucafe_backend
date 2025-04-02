import express from "express";
import {
  createCafe,
  deleteCafe,
  updateCafe,
  getAllCafes,
  getCafeById,
} from "../controllers/CafeController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

router.get("/", getAllCafes);

router.get("/:id", getCafeById);

router.post("/", checkAuth, createCafe);

router.delete("/:id", checkAuth, deleteCafe);

router.patch("/:id", checkAuth, updateCafe);

export default router;
