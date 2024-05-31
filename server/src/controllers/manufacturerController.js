const Manufacturer = require("../models/Manufacturer");

exports.getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.getAll();
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createManufacturer = async (req, res) => {
  const { title, country_id, email } = req.body;
  try {
    const newManufacturer = await Manufacturer.create(title, country_id, email);
    res.status(201).json(newManufacturer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateManufacturer = async (req, res) => {
  const { id } = req.params;
  const { title, country_id, email } = req.body;
  try {
    const updatedManufacturer = await Manufacturer.update(id, title, country_id, email);
    if (!updatedManufacturer) {
      return res.status(404).json({ error: "Manufacturer not found" });
    }
    res.status(200).json(updatedManufacturer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteManufacturer = async (req, res) => {
  const { id } = req.params;
  try {
    await Manufacturer.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
