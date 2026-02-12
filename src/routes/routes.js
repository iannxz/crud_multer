import express from 'express';
import produtoRoutes from './produtoRoutes.js';
import categoriaRoutes from './categoriaRoutes.js';

const router = express.Router();

router.use('/', produtoRoutes);
router.use('/', categoriaRoutes);

export default router;
 