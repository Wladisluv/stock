const db = require("../db");

class Supply {
  static async create(good_title, amount, provider_id, supply_date) {
    const query = `
      INSERT INTO Supply (good_title, amount, provider_id, supply_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [good_title, amount, provider_id, supply_date];
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
      FROM Supply;
    `;
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error("Ошибка при получении производителей: " + error.message);
    }
  }

  static async update(id, good_title, amount, provider_id, supply_date) {
    const query = `
      UPDATE Supply
      SET good_title = $1, amount = $2, provider_id = $3, supply_date = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [good_title, amount, provider_id, supply_date, id];
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("Ошибка при обновлении производителя: " + error.message);
    }
  }

  static async delete(id) {
    const query = `
      DELETE FROM Supply
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

module.exports = Supply;
