import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import db from "./models";
import routes from './routes';

const app = express();

// Ativa o CORS para o domínio do seu frontend
app.use(cors({
  origin: ['http://localhost:3000', 'https://booclub.damaso.com.br'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Inclui OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'], // Permite enviar o token
  credentials: true,
}));

app.use(express.json());
app.use(routes);

app.listen(3333, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Banco de dados conectado.");
  } catch (error) {
    console.log("Erro ao conectar com o banco de dados: ", error);
  }
});




