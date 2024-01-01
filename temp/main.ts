import mongoose, { Schema } from "mongoose";

main().catch(err => console.log(err));


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const bookSchema = new Schema({
    title: String,
    author: String,

    date: {type: Date, default: Date.now}
});

export const Book = mongoose.model("Book", bookSchema);

