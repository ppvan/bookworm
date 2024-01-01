import { Book } from "../models/Book";
import { BookCreate } from "../schemas/bookschema";

async function createBook(book: BookCreate) {
  const db_book = new Book(book);
  db_book.save();

  return book;
}

async function readBook(id: string) {
  return Book.findById(id);
}

async function updateBook(id: string, book: BookCreate) {
  return Book.findByIdAndUpdate(id, book, { new: true });
}

async function deleteBook(id: string) {
  const res = Book.findByIdAndDelete(id);
  return res;
}

async function readBooks() {
  const books = Book.find();

  return books;
}

export { createBook, deleteBook, readBook, readBooks, updateBook };
