import express, { Express } from "express";

import book from "./routes/book.route";


const app : Express = express();
const port = 3000;


app.use("/books", book);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
