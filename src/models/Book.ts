import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  title: String,
  author: String,

  date: { type: Date, default: Date.now },
});

export const Book = mongoose.model("Book", bookSchema);
