import { pool } from '../config/db.js';

const produtoModel = {
  selectAll: async () => {
    const sql = "SELECT * FROM produtos";
    const [rows] = await pool.query(sql);
    return rows;
  },
  selectById: async (pId) => {
    const sql = "SELECT * FROM produtos WHERE id_produto=?";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  insert: async (pNomeProd, pValorProd, pIdCategoria, pHashImagem) => {
    const sql =
      "INSERT INTO produtos(nome_produto, valor_produto, id_categoria, vinculo_imagem) VALUES (?,?,?,?);";
    const values = [pNomeProd, pValorProd, pIdCategoria, pHashImagem];
    const [rows] = await pool.query(sql, values);
    return rows;

    /***
     * Insere um produto na abse de dados
     * @param {string} pNomeProd Descrição do nome do produto que deve ser inserido no banco de dados (Ex. Teclado)
     * @param {number} pValorProd Valor do produto que deve ser inserido no banco de dados. Ex: 126.25
     * @returns {promise<Objects>} Retorna um objeto contendo propriedades sobre o resultado da execução da query
     * @example
     * const result = await produtoModel.insert(paramA, ParamB);
     *  // saida
     * "result": {
     * "fieldCount": 0,
     * "affectedRows": 1,
     * "insertId": 1,
     * "info": "",
     * "serverStatus": 2,
     * "warningStatus": 0,
     * "changedRows": 0
     * }
     */
  },

  update: async (pId, pDescricao, pValor) => {
    const sql = "UPDATE produtos SET nome_produto=?, valor_produto=? WHERE id_produto=?;";
    const values = [pDescricao, pValor, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

    delete: async (pId) => {
    const sql = "DELETE FROM produtos WHERE id_produto = ?";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;

    }

};

export { produtoModel };
