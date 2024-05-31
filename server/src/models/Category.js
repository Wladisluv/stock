// models/Category.js
const db = require("../db");

class Category {
  static async create(title) {
    const query = `
      INSERT INTO categories (title)
      VALUES ($1)
      RETURNING *;
    `;
    const values = [title];
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("Ошибка при создании категории: " + error.message);
    }
  }

  static async getAll() {
    const query = `
      SELECT * 
      FROM categories;
    `;
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error("Ошибка при получении категорий: " + error.message);
    }
  }

  static async update(id, title) {
    const query = `
      UPDATE categories
      SET title = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [title, id];
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("Ошибка при обновлении категории: " + error.message);
    }
  }

  static async delete(id) {
    const query = `
      DELETE FROM categories
      WHERE id = $1;
    `;
    const values = [id];
    try {
      await db.query(query, values);
    } catch (error) {
      throw new Error("Ошибка при удалении категории: " + error.message);
    }
  }

  static async getById(id) {
    const query = `
      SELECT *
      FROM categories
      WHERE id = $1;
    `;
    const values = [id];
    try {
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error("Категория не найдена");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Ошибка при получении категории: " + error.message);
    }
  }
  
}

module.exports = Category;
