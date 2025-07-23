import express from 'express'
import db from './src/models'
import UserControllers from "./src/controllers/user";
const app = express (); 



app.post("/", UserControllers.create);

app.listen(3333, async () => {
  try {
    await db.sequelize.authenticate();
    console.log('aplicativo em execução e banco de dados conectado');
  } catch (error) {
    console.log("Error running app:" , error);
  }
}); 