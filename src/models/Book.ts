import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
    {
        isbn: String,
        title: String,
        coverImage: String,
        description: String,
        author: String,
        publisher: String,
        publicationYear: Number,
        genres: [String],
        language: String,
        pages: Number,
    },
    { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
