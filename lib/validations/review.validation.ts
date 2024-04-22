import * as z from "zod";

export const reviewValidation = z.object({
  comment: z
    .string()
    .trim()
    .min(30, { message: "Minimum 30 characters required" })
    .max(1000, { message: "Reached max capacity of 1000 characters" }),
});
