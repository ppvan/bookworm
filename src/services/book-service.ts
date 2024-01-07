import z from "zod";
import { Book } from "../models/Book";
import { BookSchema } from "../schemas/book-schema";

async function createBook(book: z.infer<typeof BookSchema>) {
    const db_book = new Book(book);
    await db_book.save();

    return book;
}

async function readBook(id: string) {
    return Book.findById(id);
}

async function updateBook(id: string, book: z.infer<typeof BookSchema>) {
    return await Book.findByIdAndUpdate(id, book, { new: true });
}

async function deleteBook(id: string) {
    const res = await Book.findByIdAndDelete(id);
    return res;
}

async function readBooks() {
    const books = await Book.find();

    return books;
}

export { createBook, deleteBook, readBook, readBooks, updateBook };
