import*as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import db from "./src/models";
import routes from './src/routes';
const app = express();

app.use(express.json());
app.use(routes)

app.listen(3333, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Banco de dados conectado.");
  } catch (error) {
    console.log("Erro ao conectar com o banco de dados: ", error);
  }
});






