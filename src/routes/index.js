import { Router } from "express";
import authmiddleware from "../middlewares/auth";
import UserController from "../controllers/user";


const routes = new Router();

// Rotas públicas
routes.post("/User",UserController.create);
routes.post("/login",UserController.login);

// Rotas protegidas (precisam de token)
routes.use(authmiddleware);
routes.get("/user",UserController.get);

export default routes;
