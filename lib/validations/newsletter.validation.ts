import * as z from "zod";

export const newsletterValidation = z.object({
  name: z.string().min(3).max(30),
  mobile: z
    .string()
    .min(10, { message: "Invalid mobile number" })
    .max(12, { message: "Invalid mobile number" })
    .optional(),
  email: z.string().email(),
});
