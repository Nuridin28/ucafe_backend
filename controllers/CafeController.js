import CafeModel from "../models/Cafe.js";

export const createCafe = async (req, res) => {
  try {
    const doc = new CafeModel({
      name: req.body.name,
      description: req.body.description,
      phone: req.body.phone,
      logoUrl: req.body.logoUrl,
    });

    const cafe = await doc.save();
    res.status(201).json(cafe);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать кафе",
    });
  }
};

export const deleteCafe = async (req, res) => {
  try {
    const cafeId = req.params.id;
    const cafe = await CafeModel.findByIdAndDelete(cafeId);

    if (!cafe) {
      return res.status(404).json({ message: "Кафе не найдено" });
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить кафе",
    });
  }
};

export const updateCafe = async (req, res) => {
  try {
    const cafeId = req.params.id;

    const updatedCafe = await CafeModel.findByIdAndUpdate(
      cafeId,
      {
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
        logoUrl: req.body.logoUrl,
      },
      { new: true }
    );

    if (!updatedCafe) {
      return res.status(404).json({ message: "Кафе не найдено" });
    }

    res.json(updatedCafe);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить кафе",
    });
  }
};

export const getAllCafes = async (req, res) => {
  try {
    const cafes = await CafeModel.find();
    res.json(cafes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить список кафе",
    });
  }
};

export const getCafeById = async (req, res) => {
  try {
    const cafeId = req.params.id;
    const cafe = await CafeModel.findById(cafeId);

    if (!cafe) {
      return res.status(404).json({ message: "Кафе не найдено" });
    }

    res.json(cafe);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить кафе",
    });
  }
};
