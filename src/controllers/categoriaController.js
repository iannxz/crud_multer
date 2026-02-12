import { categoriaModel } from '../models/categoriaModel.js';

const categoriaController = {
  // GET /categorias - Lista categorias ou por idCategoria
  selecionaTodos: async (req, res) => {
    try {
      const { idCategoria } = req.query;
      if (idCategoria) {
        const resultado = await categoriaModel.selectById(idCategoria);
        if (resultado.length === 0) {
          return res.status(200).json({ message: 'Categoria não encontrada' });
        }
        return res.status(200).json({ data: resultado });
      }
      const resultado = await categoriaModel.selectAll();
      if (resultado.length === 0) {
        return res.status(200).json({ message: 'A consulta não retornou resultados' });
      }
      res.status(200).json({ data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
  },

  // POST /categorias - Cria categoria
  incluiRegistro: async (req, res) => {
    try {
      const { descricao } = req.body;
      if (!descricao || !isNaN(descricao)) {
        return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
      }
      const resultado = await categoriaModel.insert(descricao);
      if (resultado.insertId === 0) {
        throw new Error("Ocorreu um erro ao incluir a categoria");
      }
      res.status(201).json({
        message: 'Categoria incluída com sucesso',
        data: resultado,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
  },

  // PUT /categorias/:idCategoria - Atualiza categoria
  alteraCategoria: async (req, res) => {
    try {
      const idCategoria = Number(req.params.idCategoria);
      const { descricao } = req.body;
      
      if (!idCategoria || !descricao || !isNaN(descricao) || typeof idCategoria !== 'number') {
        return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
      }
      
      const categoriaAtual = await categoriaModel.selectById(idCategoria);
      if (categoriaAtual.length === 0) {
        return res.status(200).json({ message: 'Categoria não localizada' });
      }
      
      const resultUpdate = await categoriaModel.update(idCategoria, descricao);
      
      if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
        return res.status(200).json({ message: 'Não há alterações a serem realizadas' });
      }
      
      if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 1) {
        return res.status(200).json({ message: 'Alteração realizada com sucesso' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
  },

  // DELETE /categorias/:idCategoria - Deleta categoria
  deleteCategoria: async (req, res) => {
    try {
      const idCategoria = Number(req.params.idCategoria);
      
      if (!idCategoria || !Number.isInteger(idCategoria)) {
        return res.status(400).json({ message: 'Forneça um identificador válido' });
      }
      
      const categoriaSelecionada = await categoriaModel.selectById(idCategoria);
      if (categoriaSelecionada.length === 0) {
        return res.status(200).json({ message: 'Categoria não localizada na base de dados' });
      }
      
      const resultadoDelete = await categoriaModel.delete(idCategoria);
      if (resultadoDelete.affectedRows === 0) {
        return res.status(200).json({ message: 'Ocorreu um erro ao excluir a categoria' });
      }
      
      res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
  },
};

export { categoriaController };
