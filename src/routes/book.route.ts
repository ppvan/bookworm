import express, { Request, Response } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { BookCreateSchema } from "../schemas/bookschema";
import { createBook, readBooks } from "../services/book.service";

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

bookRouter.put("/", async (req: Request, res: Response) => {
  res.json({ books: [] });
});

bookRouter.delete("/", async (req: Request, res: Response) => {
  res.json({ ok: true });
});

export default bookRouter;
