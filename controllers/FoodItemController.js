import FoodItemModel from "../models/FoodItem.js";
import Cafe from "../models/Cafe.js";

export const createFoodItem = async (req, res) => {
  try {
    const { cafe, name, description, price, imageUrl } = req.body;

    const existingCafe = await Cafe.findById(cafe);
    if (!existingCafe) {
      return res.status(404).json({ message: "Кафе не найдено" });
    }

    if (!name || !price) {
      return res.status(400).json({ message: "Имя и цена блюда обязательны" });
    }

    const foodItem = new FoodItemModel({
      cafe,
      name,
      description,
      price,
      imageUrl,
    });

    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (err) {
    console.error("Ошибка при создании блюда:", err);
    res.status(500).json({ message: "Не удалось создать блюдо" });
  }
};

export const updateFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;
    const { name, description, price, imageUrl } = req.body;

    const updatedFoodItem = await FoodItemModel.findByIdAndUpdate(
      foodId,
      { name, description, price, imageUrl },
      { new: true }
    );

    if (!updatedFoodItem) {
      return res.status(404).json({ message: "Блюдо не найдено" });
    }

    res.status(200).json(updatedFoodItem);
  } catch (err) {
    console.error("Ошибка при обновлении блюда:", err);
    res.status(500).json({ message: "Не удалось обновить блюдо" });
  }
};

export const deleteFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;

    const deletedFoodItem = await FoodItemModel.findByIdAndDelete(foodId);

    if (!deletedFoodItem) {
      return res.status(404).json({ message: "Блюдо не найдено" });
    }

    res.status(200).json({ message: "Блюдо удалено" });
  } catch (err) {
    console.error("Ошибка при удалении блюда:", err);
    res.status(500).json({ message: "Не удалось удалить блюдо" });
  }
};

export const getFoodItemsByCafe = async (req, res) => {
  try {
    const { cafeId } = req.params;
    const foodItems = await FoodItemModel.find({ cafe: cafeId });
    res.json(foodItems);
  } catch (err) {
    console.error("Ошибка при получении блюд:", err);
    res.status(500).json({ message: "Не удалось получить блюда" });
  }
};

export const getFoodItemById = async (req, res) => {
  try {
    const { foodId } = req.params;
    const foodItem = await FoodItemModel.findById(foodId);

    if (!foodItem) {
      return res.status(404).json({ message: "Блюдо не найдено" });
    }

    res.json(foodItem);
  } catch (err) {
    console.error("Ошибка при получении блюда:", err);
    res.status(500).json({ message: "Не удалось получить блюдо" });
  }
};

export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItemModel.find();
    res.json(foodItems);
  } catch (err) {
    console.error("Ошибка при получении всех блюд:", err);
    res.status(500).json({ message: "Не удалось получить блюда" });
  }
};
