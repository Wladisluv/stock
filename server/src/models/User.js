const db = require("../db/index");

class User {
  static async findByCredentials(email, password) {
    try {
      const query = `
        SELECT * 
        FROM users 
        WHERE email = $1 AND password = $2
      `;
      const { rows } = await db.query(query, [email, password]);
      
      // Если найден пользователь с заданным email и паролем, возвращаем его
      if (rows.length > 0) {
        return rows[0];
      } else {
        // Если пользователь не найден, возвращаем null
        return null;
      }
    } catch (error) {
      throw new Error("Ошибка при поиске пользователя: " + error.message);
    }
  }
}

module.exports = User;
