const express = require("express");
const router = express.Router();
const supplyController = require("../controllers/supplyController");

router.get("/", supplyController.getAllSupplies);
router.post("/add", supplyController.createSupply);
router.put("/update/:id", supplyController.updateSupply);
router.delete("/delete/:id", supplyController.deleteSupply);

module.exports = router;
