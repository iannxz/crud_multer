import { pool } from '../config/db.js';

const categoriaModel = {
  selectAll: async () => {
    const sql = "SELECT * FROM categorias";
    const [rows] = await pool.query(sql);
    return rows;
  },

  selectById: async (pId) => {
    const sql = "SELECT * FROM categorias WHERE id_categoria=?";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  insert: async (pDescricao) => {
    const sql = "INSERT INTO categorias(descricao_categoria) VALUES (?);";
    const values = [pDescricao];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  update: async (pId, pDescricao) => {
    const sql = "UPDATE categorias SET descricao_categoria=? WHERE id_categoria=?;";
    const values = [pDescricao, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  delete: async (pId) => {
    const sql = "DELETE FROM categorias WHERE id_categoria = ?";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  }
};

export { categoriaModel };
