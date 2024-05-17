const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login); // Обработчик для POST-запроса на /api/auth/login

module.exports = router;
