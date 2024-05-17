const User = require("../models/User");

exports.login = async (req, res) => {
  console.log("Received request to login:", req.body); // Проверяем, что получаемые данные корректны
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    console.log("User found:", user); // Проверяем, что пользователь найден
    // Реализуйте здесь логику для генерации и отправки токена авторизации
    res.status(200).send({ user });
  } catch (error) {
    console.error("Error while logging in:", error); // Выводим ошибку, если возникает проблема
    res.status(400).send({ error: error.message });
  }
};