const express = require("express");
const router = express.Router();
const goodController = require("../controllers/goodController");

router.get("/", goodController.getAllGoods);
router.post("/add", goodController.createGood);
router.put("/update/:id", goodController.updateGood);
router.delete("/delete/:id", goodController.deleteGood);

module.exports = router;
