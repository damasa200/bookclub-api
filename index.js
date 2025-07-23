import express from "express";
import db from "./src/models";
import UserController from "./src/controllers/user";
const app = express();

app.use(express.json());
app.post("/", UserController.create);

app.listen(3333, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Banco de dados conectado.");
  } catch (error) {
    console.log("Erro ao conectar com o banco de dados: ", error);
  }
});






