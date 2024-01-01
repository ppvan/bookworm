import { Book } from "../models/Book";
import { BookCreate } from "../schemas/bookschema";

async function createBook(book: BookCreate) {
  console.log(book);

  const db_book = new Book(book);
  db_book.save();

  return book;
}

async function readBooks() {}

export { createBook, readBooks };
