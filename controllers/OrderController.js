import OrderModel from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    if (orders.length === 0) {
      return res.status(404).json({
        message: "Нет заказов",
      });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить заказы",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        message: "Заказ не найден",
      });
    }
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить заказ",
    });
  }
};

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

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Не указан новый статус",
      });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Заказ не найден",
      });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статус заказа",
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Заказ не найден",
      });
    }

    res.status(200).json({
      message: "Заказ удалён успешно",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить заказ",
    });
  }
};
