const db = require("../db");

class Manufacturer {
  static async create(title, country_id, email) {
    const query = `
      INSERT INTO Manufacturer (title, country_id, email)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, country_id, email];
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
      FROM Manufacturer;
    `;
    try {
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error("Ошибка при получении производителей: " + error.message);
    }
  }

  static async update(id, title, country_id, email) {
    const query = `
      UPDATE Manufacturer
      SET title = $1, country_id = $2, email = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [title, country_id, email, id];
    try {
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error("Ошибка при обновлении производителя: " + error.message);
    }
  }

  static async delete(id) {
    const query = `
      DELETE FROM Manufacturer
      WHERE id = $1;
    `;
    const values = [id];
    try {
      await db.query(query, values);
    } catch (error) {
      throw new Error("Ошибка при удалении производителя: " + error.message);
    }
  }

  static async getById(id) {
    const query = `
      SELECT *
      FROM Manufacturer
      WHERE id = $1;
    `;
    const values = [id];
    try {
      const { rows } = await db.query(query, values);
      if (rows.length === 0) {
        throw new Error("Производитель не найден");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Ошибка при получении производителя: " + error.message);
    }
  }
}

module.exports = Manufacturer;
