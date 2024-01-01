import express, { Express } from "express";

import mongoose from "mongoose";
import bookRouter from "./routes/book.route";

async function main() {
  const connectionString = "mongodb://127.0.0.1:27017/bookworn";
  await mongoose.connect(connectionString);

  const app: Express = express();
  const port = 3000;
  app.use(express.json());
  app.use("/books", bookRouter);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main().catch((err) => {
  console.log(err);
});
