import express, { Request, Response } from "express"
import { ZodError } from "zod"
import { fromZodError } from "zod-validation-error"
import { BookCreateSchema } from "../schemas/book-schema"
import {
    createBook,
    deleteBook,
    readBook,
    readBooks,
    updateBook,
} from "../services/book-service"

import { asyncWrapper } from "../utils/async-handler"

const bookRouter = express.Router()

bookRouter.get(
    "/",
    asyncWrapper(async (req: Request, res: Response) => {
        const books = await readBooks()

        res.json({ books: books })
    })
)

bookRouter.post(
    "/",
    asyncWrapper(async (req: Request, res: Response) => {
        try {
            const payload = BookCreateSchema.parse(req.body)
            const created = await createBook(payload)

            res.json({ book: created })
        } catch (err) {
            const validationError = fromZodError(err as ZodError)

            res.status(400)
            res.json(validationError)
        }
    })
)

bookRouter.get(
    "/:id",
    asyncWrapper(async (req: Request, res: Response) => {
        const id: string = req.params.id
        const book = await readBook(id)
        res.json(book)
    })
)

bookRouter.put(
    "/:id",
    asyncWrapper(async (req: Request, res: Response) => {
        const id = req.params.id
        const payload = BookCreateSchema.parse(req.body)
        const updated = await updateBook(id, payload)

        res.json(updated)
    })
)

bookRouter.delete(
    "/:id",
    asyncWrapper(async (req: Request, res: Response) => {
        const id = req.params.id

        const book = await deleteBook(id)

        res.json({ book: book })
    })
)

export default bookRouter
