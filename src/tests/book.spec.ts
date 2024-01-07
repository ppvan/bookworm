import { assert } from "chai";
import mongoose from "mongoose";
import { Book } from "../models/Book";
import { createBook, deleteBook, updateBook } from "../services/book-service";

describe("Book Model", function () {
    describe("Mongoose should connect and disconnect normal", function () {
        it("Connect", async function () {
            await mongoose.connect("mongodb://127.0.0.1:27017/bookworn-test", {
                serverSelectionTimeoutMS: 1000,
            });
        });

        it("Disconnect", async function () {
            await mongoose.connection.close();
        });
    });

    describe("Book CRUD", function () {
        before(async function () {
            await mongoose.connect("mongodb://127.0.0.1:27017/bookworn-test", {
                serverSelectionTimeoutMS: 1000,
            });

            await mongoose.connection.db.dropDatabase();
        });
        after(async function () {
            await mongoose.connection.close();
        });

        it("Create a book", async function () {
            const book = await createBook({
                isbn: "978-3-16-148410-0",
                title: "Simple book",
                coverImage: "http://example.com",
                description: "Book description details",
                author: "ppvan",
                publisher: "oh my god",
                publicationYear: 2023,
                genres: ["science", "programming"],
                language: "en",
                pages: 489,
            });

            const matches = await Book.find();

            assert.equal(matches.length, 1);
        });

        it("Update book", async function () {
            const old = await Book.findOne();

            assert.isNotNull(old, "Should find at least one document");

            const updated = await updateBook(old!!.id, {
                isbn: "978-3-16-148410-0",
                title: "Simple book",
                coverImage: "http://example.com",
                description: "Book description details",
                author: "ahihi", // updated part
                publisher: "oh my god",
                publicationYear: 2023,
                genres: ["science", "programming"],
                language: "en",
                pages: 489,
            });

            assert.equal(updated?.author, "ahihi");
        });

        it("Delete book", async function () {
            const old = await Book.findOne();

            assert.isNotNull(old, "Should find at least one document");

            await deleteBook(old!!.id);

            const books = await Book.find();
            assert.equal(books.length, 0);
        });
    });
});
