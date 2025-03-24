import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { registerValidation } from "../validations/validations.js";
import * as UserController from "../controllers/UserController.js";
import checkAuth from "../middlewares/checkAuth.js";
import cors from "cors";

configDotenv();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_LINK)
  .then(() => console.log("ok"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("server start"));

app.post("/auth/register", registerValidation, UserController.register);

app.post("/auth/login", UserController.login);

app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/users", async (req, res) => {
  res.json({ data: "users" });
});
