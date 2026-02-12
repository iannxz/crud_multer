import express from 'express';
import multer from 'multer';
import { categoriaController } from '../controllers/categoriaController.js';

const categoriaRoutes = express.Router();
const upload = multer();

categoriaRoutes.get('/categorias', categoriaController.selecionaTodos);
categoriaRoutes.post('/categorias', upload.none(), categoriaController.incluiRegistro);
categoriaRoutes.put('/categorias/:idCategoria', upload.none(), categoriaController.alteraCategoria);
categoriaRoutes.delete('/categorias/:idCategoria', categoriaController.deleteCategoria);

export default categoriaRoutes;
