const express = require("express");
const router = express.Router();
const manufacturerController = require("../controllers/manufacturerController");

router.get("/", manufacturerController.getAllManufacturers);
router.post("/add", manufacturerController.createManufacturer);
router.put("/update/:id", manufacturerController.updateManufacturer);
router.delete("/delete/:id", manufacturerController.deleteManufacturer);

module.exports = router;
