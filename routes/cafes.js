import express from "express";
import {
  createCafe,
  deleteCafe,
  updateCafe,
  getAllCafes,
} from "../controllers/cafeController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();

router.get("/", getAllCafes);

router.post("/", checkAuth, createCafe);

router.delete("/:id", checkAuth, deleteCafe);

router.patch("/:id", checkAuth, updateCafe);

export default router;
