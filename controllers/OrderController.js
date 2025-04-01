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

    if (!cafe || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Некорректные данные заказа" });
    }

    const totalPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = new OrderModel({
      user: req.userId,
      cafe,
      items,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Не удалось создать заказ" });
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

export const getCafeOrders = async (req, res) => {
  try {
    const cafeId = req.params.cafeId;
    const orderStatus = req.params.orderStatus;
    const newOrders = await OrderModel.find({
      cafe: cafeId,
      status: orderStatus,
    });
    res.status(200).json(newOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить новые заказы",
    });
  }
};
