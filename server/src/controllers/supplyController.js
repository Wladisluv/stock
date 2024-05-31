const Supply = require("../models/Supply");

exports.getAllSupplies = async (req, res) => {
  try {
    const manufacturers = await Supply.getAll();
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createSupply = async (req, res) => {
  const { good_title, amount, provider_id, supply_date } = req.body;
  try {
    const newSupply = await Supply.create(good_title, amount, provider_id, supply_date);
    res.status(201).json(newSupply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSupply = async (req, res) => {
  const { id } = req.params;
  const { good_title, amount, provider_id, supply_date } = req.body;
  try {
    const updatedSupply = await Supply.update(id, good_title, amount, provider_id, supply_date);
    if (!updatedSupply) {
      return res.status(404).json({ error: "Supply not found" });
    }
    res.status(200).json(updatedSupply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSupply = async (req, res) => {
  const { id } = req.params;
  try {
    await Supply.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
