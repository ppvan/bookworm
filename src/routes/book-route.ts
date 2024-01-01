import express, { Request, Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { BookCreateSchema } from "../schemas/book-schema";
import {
  createBook,
  deleteBook,
  readBook,
  readBooks,
  updateBook,
} from "../services/book-service";

const bookRouter = express.Router();

bookRouter.get("/", async (req: Request, res: Response) => {
  const books = await readBooks();

  res.json({ books: books });
});

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const payload = BookCreateSchema.parse(req.body);
    const created = await createBook(payload);

    res.json({ book: created });
  } catch (err) {
    const validationError = fromZodError(err as ZodError);

    res.status(400);
    res.json(validationError);
  }
});

bookRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const book = await readBook(id);

  res.json(book);
});

bookRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const payload = BookCreateSchema.parse(req.body);
    const updated = await updateBook(id, payload);

    res.json(updated);
  } catch (err) {
    const validationError = fromZodError(err as ZodError);

    res.status(400);
    res.json(validationError);
  }
});

bookRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const book = await deleteBook(id);

  res.json({ book: book });
});

export default bookRouter;
