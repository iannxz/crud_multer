import express from 'express';
import router from './src/routes/routes.js';
import path from 'path';
import 'dotenv/config';
import { initDatabase } from './src/config/db.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/uploads', express.static(path.resolve('uploads')));

const startServer = async () => {
  await initDatabase();
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
  });
};

startServer();