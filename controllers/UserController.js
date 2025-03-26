import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, fullName, avatarUrl, password } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const doc = new UserModel({
      email,
      fullName,
      avatarUrl,
      passwordHash: hash,
      role: req.body.role || "user",
    });

    const user = await doc.save();

    const token = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        "secret123",
        { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(201).json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPass = await bcryptjs.compare(
        req.body.password,
        user.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        "secret123",
        { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
