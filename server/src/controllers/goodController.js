const Category = require("../models/Category")
const Good = require("../models/Good");
const Manufacturer = require("../models/Manufacturer")

exports.getAllGoods = async (req, res) => {
  try {
    const goods = await Good.getAll();
    const goodsWithCategoryAndManufacturer = await Promise.all(goods.map(async (good) => {
      // Получаем информацию о категории по её ID
      const category = await Category.getById(good.category_id);
      // Получаем информацию о производителе по его ID
      const manufacturer = await Manufacturer.getById(good.manufacturer_id);
      // Создаем новый объект товара с названиями категории и производителя вместо их ID
      const goodWithCategoryAndManufacturer = {
        ...good,
        category: category.title,
        manufacturer: manufacturer.title
      };
      return goodWithCategoryAndManufacturer;
    }));
    res.status(200).json(goodsWithCategoryAndManufacturer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createGood = async (req, res) => {
  const { title, country_id, price, manufacturer_id, amount, characteristic } = req.body;
  try {
    const newGood = await Good.create(title, country_id, price, manufacturer_id, amount, characteristic);
    res.status(201).json(newGood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGood = async (req, res) => {
  const { id } = req.params;
  const { title, category_id, price, manufacturer_id, amount, characteristic } = req.body;
  try {
    const updatedGood = await Good.update(id, title, category_id, price, manufacturer_id, amount, characteristic);
    if (!updatedGood) {
      return res.status(404).json({ error: "Good not found" });
    }
    res.status(200).json(updatedGood); // Исправлено с updatedManufacturer на updatedGood
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteGood = async (req, res) => {
  const { id } = req.params;
  try {
    await Good.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
