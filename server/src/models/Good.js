const db = require("../db");

class Good {
  static async create(title, category_id, price, manufacturer_id, amount, characteristic) {
    const query = `
      INSERT INTO Good (title, category_id, price, manufacturer_id, amount, characteristic)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [title, category_id, price, manufacturer_id, amount, characteristic];
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("Ошибка при создании производителя: " + error.message);
    }
  }

  static async getAll() {
    const query = `
      SELECT * 
      FROM Good;
    `;
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error("Ошибка при получении производителей: " + error.message);
    }
  }

  static async update(id, title, category_id, price, manufacturer_id, amount, characteristic) {
    const query = `
      UPDATE Good
      SET title = $1, category_id = $2, price = $3, manufacturer_id = $4, amount = $5, characteristic = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [title, category_id, price, manufacturer_id, amount, characteristic, id];
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("Ошибка при обновлении производителя: " + error.message);
    }
  }
  

  static async delete(id) {
    const query = `
      DELETE FROM Good
      WHERE id = $1;
    `;
    const values = [id];
    try {
      await db.query(query, values);
    } catch (error) {
      throw new Error("Ошибка при удалении производителя: " + error.message);
    }
  }
}

module.exports = Good;
