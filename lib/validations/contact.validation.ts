import * as z from "zod";

const indianMobileNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

export const contactValidation = z.object({
  name: z.string().trim().min(3).max(30),
  mobile: z.string().refine((value) => indianMobileNumberRegex.test(value), {
    message: "Invalid mobile number",
  }),
  email: z.string().email(),
  subject: z
    .string()
    .trim()
    .min(10, { message: "Minimum 10 characters required" }),
  query: z
    .string()
    .trim()
    .min(10, { message: "Minimum 20 characters required" }),
});
