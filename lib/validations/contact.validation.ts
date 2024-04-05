import * as z from "zod";

export const contactValidation = z.object({
  name: z.string().min(3).max(30),
  mobile: z
    .string()
    .min(10, { message: "Invalid mobile number" })
    .max(12, { message: "Invalid mobile number" }),
  email: z.string().email(),
  subject: z.string().min(10, { message: "Minimum 10 characters required" }),
  query: z.string().min(10, { message: "Minimum 20 characters required" }),
});
