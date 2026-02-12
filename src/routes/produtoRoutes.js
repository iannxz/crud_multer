import express from 'express';
import multer from 'multer';
import { produtoController } from '../controllers/produtoController.js';

const produtoRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

produtoRoutes.get('/produtos', produtoController.selecionaTodos);
produtoRoutes.post('/produtos', upload.single('imagem'), produtoController.incluiRegistro);
produtoRoutes.put('/produtos/:idProduto', upload.none(), produtoController.alteraProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.deleteProduto);

export default produtoRoutes;

