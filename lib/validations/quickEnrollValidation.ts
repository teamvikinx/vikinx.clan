import * as z from "zod";
import { states } from "../data/states";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const indianMobileNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

export const quickEnrollFormValidation = z
  .object({
    mobile: z.string().refine((value) => indianMobileNumberRegex.test(value), {
      message: "Invalid mobile number",
    }),
    emergency_number: z
      .string()
      .refine((value) => indianMobileNumberRegex.test(value), {
        message: "Invalid mobile number",
      }),
    dob: z
      .string({
        required_error: "DOB is required",
      })
      .refine((date) => new Date(date) <= eighteenYearsAgo, {
        message: "You must be at least 18 years old to register",
      })
      .default(""),
    state: z.enum(states as [string, ...string[]], {
      required_error: "State is required",
    }),
  })
  .refine((data) => data.mobile !== data.emergency_number, {
    message: "Mobile and emergency number must be different",
    path: ["emergency_number"],
  });
