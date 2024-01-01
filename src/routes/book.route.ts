

import express, { Request, Response } from "express";


const book = express.Router();


book.get("/", async (req: Request, res: Response) => {
    res.json({"books": []});
})

book.post("/",async (req: Request, res: Response) => {
    res.json({"message": "do some shit"});
})

book.put("/",async (req: Request, res: Response) => {
    res.json({"books": []});
})

book.delete("/",async (req: Request, res: Response) => {
    res.json({"ok": true});
})

export default book;