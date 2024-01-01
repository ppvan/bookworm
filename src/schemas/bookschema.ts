import { z } from "zod";

const BookCreateSchema = z.object({
  title: z.string({
    required_error: "Tiêu đề không được bỏ trống",
  }),
  author: z.string({
    required_error: "Tác giả không được bỏ trống",
  }),
});

type BookCreate = z.infer<typeof BookCreateSchema>;

export { BookCreate, BookCreateSchema };
