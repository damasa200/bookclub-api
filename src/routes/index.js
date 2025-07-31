import { Router } from "express";
import authmiddleware from "../middlewares/auth";
import UserController from "../controllers/user";
import CategoryController from "../controllers/category";
import AuthorController from '../controllers/author';
import BookController from '../controllers/book';
import UserBookController from '../controllers/userbook';
import SearchController from '../controllers/search';
import { ro } from "date-fns/locale";

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
routes.get("/category", CategoryController.getAll);
routes.post("/author", AuthorController.create);
routes.get("/author",AuthorController.getAll);
routes.post("/book", BookController.create);
routes.get("/book", BookController.findAll);
routes.post("/userbook",UserBookController.create);
routes.get("/userbook", UserBookController.getAll);
routes.delete("/userbook/:id", UserBookController.delete);
routes.get("/search", SearchController.get);



export default routes;
