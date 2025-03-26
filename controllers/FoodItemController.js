import FoodItemModel from "../models/FoodItem.js";

export const createFoodItem = async (req, res) => {
    try {
        const { cafe, name, description, price, imageUrl } = req.body;

        const doc = new FoodItemModel({
            cafe,
            name,
            description,
            price,
            imageUrl,
        });

        const foodItem = await doc.save();

        res.status(201).json(foodItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать блюдо",
        });
    }
};
