import * as z from "zod";

const indianMobileNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

export const newsletterValidation = z.object({
  name: z.string().min(3).max(30),
  mobile: z
    .string()
    .refine((value) => indianMobileNumberRegex.test(value), {
      message: "Invalid mobile number",
    })
    .optional()
    .or(z.literal("")),
  email: z.string().email(),
});
