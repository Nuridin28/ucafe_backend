import OrderModel from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const { cafe, items } = req.body;


        const totalPrice = items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        const doc = new OrderModel({
            user: req.userId,
            cafe,
            items,
            totalPrice,
        });

        const order = await doc.save();

        res.status(201).json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать заказ",
        });
    }
};
