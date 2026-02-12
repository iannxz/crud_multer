import { produtoModel } from '../models/produtoModel.js';
import { categoriaModel } from '../models/categoriaModel.js';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

const produtoController = {


  /**
   * Retorna os produtos cadastrados
   * Rota GET /produtos
   * @async
   * @function selecionaTodos
   * @param {Request} req Objeto da requisição HTTP 
   * @param {Response} res Objeto da resposta HTPP 
   * @returns {promiseArrayObjects>>} Objeto contendo o resultado da consulta
   */

  // GET /produtos - Lista todos os produtos (ou por idProduto via query)
  selecionaTodos: async (req, res) => {
    try {
      const { idProduto } = req.query;
      if (idProduto) {
        const resultadoProduto = await produtoModel.selectById(idProduto);
        return res.status(200).json({ message: 'A consulta não retornou resultados' });

      }
      const resultado = await produtoModel.selectAll();
      if (resultado.length === 0 ) {
        return res.status(200).json({ message: 'A consulta não retornou resultados' });
      }
      res.status(200).json({data: resultado})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro no servidor',
        errorMEssage: error.message });
    }
  },

  // POST /produtos - Cria produto com upload de imagem
  incluiRegistro: async (req, res) => {
    try {
      const { descricao, valor, idCategoria } = req.body;
      const idCategoriaNumero = Number(idCategoria);

      if (!descricao || !valor || !idCategoria || !Number.isInteger(idCategoriaNumero) || !isNaN(descricao) || isNaN(valor)) {
        console.error('Dados inválidos:', { descricao, valor, idCategoria });
        return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
      }

      // Verifica se a categoria existe
      const categoriaExiste = await categoriaModel.selectById(idCategoriaNumero);
      if (categoriaExiste.length === 0) {
        return res.status(400).json({ message: 'Categoria não encontrada. Crie a categoria antes de adicionar produtos.' });
      }

      // Processa o upload da imagem
      let hashImagem = null;
      if (req.file && req.file.buffer) {
        const tiposPermitidos = {
          'image/jpeg': '.jpg',
          'image/jpg': '.jpg',
          'image/png': '.png',
          'image/webp': '.webp',
          'image/gif': '.gif',
        };
        
        const extensao = tiposPermitidos[req.file.mimetype];
        if (!extensao) {
          return res.status(400).json({ message: 'Formato de imagem inválido. Envie JPG, PNG, WEBP ou GIF.' });
        }

        const hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
        const nomeArquivo = hash + extensao;
        const caminhoArquivo = path.join(process.cwd(), 'uploads', nomeArquivo);
        await fs.writeFile(caminhoArquivo, req.file.buffer);
        hashImagem = nomeArquivo;
      }

      const resultado = await produtoModel.insert(descricao, valor, idCategoriaNumero, hashImagem);
      if (resultado.insertId === 0) {
        throw new Error('Ocorreu um erro ao incluir o produto');
      }
      res.status(201).json({
        message: 'Registro incluído com sucesso',
        data: resultado,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro no servidor',
        errorMessage: error.message });
    }
  },

  // PUT /produtos/:idProduto - Atualiza produto
  alteraProduto: async (req, res) => {
    try {
      const idProduto = Number(req.params.idProduto);
      const { descricao, valor } = req.body;

      if (!idProduto || (!descricao && !valor) || !isNaN(descricao) && !isNaN(valor) || typeof idProduto != 'number')
        { return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
      }
      const produtoAtual = await produtoModel.selectById(idProduto);
      if (produtoAtual.length === 0) {
        return res.status(200).json({message: 'Produto não localizado'});
      }

      let novaDescricao = produtoAtual[0].nome_produto;
      if (descricao) {
        novaDescricao = descricao;
      }

      let novoValor = produtoAtual[0].valor_produto;
      if (valor) {
        novoValor = valor;
      }

      const resultUpdate = await produtoModel.update(idProduto, novaDescricao, novoValor);


      if(resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
        res.status(200).json({ message: 'Não há alterações a serem realizadas'})
      };

      if(resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 1){
        res.status(200).json({ message: 'Alteração Realizada com Sucesso'})
      }

    } catch (error) {
      console.error(error)
      res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
    }
  },

  // DELETE /produtos/:idProduto - Deleta produto
  deleteProduto: async (req, res) => {
    try {
      const idProduto = Number(req.params.idProduto);

      if(!idProduto || !Number.isInteger(idProduto)) {
        return res.status(400).json({message: 'forneça um identificador válido'});
      }

      const produtoSelecionado = await produtoModel.selectById(idProduto);
      if (produtoSelecionado.length === 0 ) {
        return res.status(200).json({message: 'produto nao localizado na base de dados'});
      }
      const resultadoDelete = await produtoModel.delete(idProduto);
      if (resultadoDelete.affectedRows === 0) {
        return res.status(200).json({message: 'ocorreu um erro ao excluir o produto'})
      }

      res.status(200).json({message: 'produto excluido com sucesso'})

    } catch (error) {
      console.error(error)
      res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message});
    }

  },

};
export { produtoController };
