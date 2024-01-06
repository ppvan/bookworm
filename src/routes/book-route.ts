import express, { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BookSchema } from "../schemas/book-schema";
import {
    createBook,
    deleteBook,
    readBook,
    readBooks,
    updateBook,
} from "../services/book-service";

import { asyncWrapper } from "../utils/async-handler";

const bookRouter = express.Router();

bookRouter.get(
    "/",
    asyncWrapper(async (req: Request, res: Response) => {
        const books = await readBooks();

        res.json({ books: books });
    })
);

bookRouter.post(
    "/",
    asyncWrapper(async (req: Request, res: Response) => {
        const payload = BookSchema.parse(req.body);
        const created = await createBook(payload);

        res.status(StatusCodes.CREATED).json({
            message: ReasonPhrases.CREATED,
            data: created,
        });
    })
);

bookRouter.get(
    "/:id",
    asyncWrapper(async (req: Request, res: Response) => {
        const id: string = req.params.id;
        const book = await readBook(id);
        res.status(200).json({
            message: ReasonPhrases.OK,
            data: book,
        });
    })
);

bookRouter.put(
    "/:id",
    asyncWrapper(async (req: Request, res: Response) => {
        const id = req.params.id;
        const payload = BookSchema.parse(req.body);
        const updated = await updateBook(id, payload);

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: updated,
        });
    })
);

bookRouter.delete(
    "/:id",
    asyncWrapper(async (req: Request, res: Response) => {
        const id = req.params.id;
        const book = await deleteBook(id);

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: book,
        });
    })
);

export default bookRouter;
