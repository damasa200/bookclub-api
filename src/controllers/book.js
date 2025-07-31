import { Book, Category, Author } from "../models"; // Corrigido: Categories → Category
import * as Yup from "yup";

class BookController {
  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        category_id: Yup.number().required("Categoria é obrigatória"),
        author_id: Yup.number().required("Autor é obrigatório"),
        name: Yup.string().required("Nome é obrigatório"),
        cover_url: Yup.string().url("Cover deve ser uma URL válida."),
        release_date: Yup.date().typeError("Data de lançamento deve ser um formato de data válida."),
        pages: Yup.number(),
        synopsis: Yup.string(),
        highlighted: Yup.boolean(),
      });

      await schema.validate(req.body);

      const { category_id, author_id } = req.body;

      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      const author = await Author.findByPk(author_id);
      if (!author) {
        return res.status(404).json({ error: "Autor não encontrado" });
      }

      const book = await Book.create({
        ...req.body,
      });

      return res.json(book);
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
  async findAll (req, res) {
    try {
      const books = await Book.findAll ({
        include: [
          {
            model:Author,
            as:"author",
          },
          {
            model: Category,
            as: "category",
          }, 
        ],
      });
      return res.json(books);
    } catch (error) {
      return res.status(400).json({ error: error?.message});
    }
  }
}

export default new BookController();
