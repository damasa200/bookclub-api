import { Router } from "express";
import authmiddleware from "../middlewares/auth";
import UserController from "../controllers/user";

const routes = new Router();

// Rotas públicas
routes.post("/User", UserController.create);
routes.post("/login", UserController.login);
routes.post("/forgot-password", UserController.forgotPassword);
routes.post("/reset-password",UserController.resetPassword);


// Rota pública de teste de e-mail
routes.get("/test-email", (req, res) => UserController.testEmail(req, res));

// Rotas protegidas (precisam de token)
routes.use(authmiddleware);
routes.get("/user", UserController.get);

export default routes;
