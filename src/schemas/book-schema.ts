import { z } from "zod";

const BookSchema = z.object({
    isbn: z.string(),
    title: z.string(),
    coverImage: z.string().url({
        message: "Cover Image must be an url",
    }),
    description: z.string(),
    author: z.string(),
    publisher: z.string(),
    publicationYear: z
        .number()
        .int()
        .min(0, {
            message: "publicationYear must be in [0-9999]",
        })
        .max(9999, {
            message: "publicationYear must be in [0-9999]",
        }),

    genres: z.array(z.string()),
    language: z.string(),
    pages: z.number().int({
        message: "Page should be an int",
    }),
});

export { BookSchema };
