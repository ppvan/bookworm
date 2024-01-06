import { z } from "zod";

const BookSchema = z.object({
    title: z.string({
        required_error: "Tiêu đề không được bỏ trống",
    }),
    author: z.string({
        required_error: "Tác giả không được bỏ trống",
    }),
});

export { BookSchema };
