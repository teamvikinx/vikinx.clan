import * as z from "zod";
import { states } from "../data/states";
import { constants } from "../utils";

const bikes = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Bike name must contain at least 3 character(s)" }),
  pet_name: z
    .string()
    .trim()
    .min(3, { message: "Pet name must contain at least 3 character(s)" })
    .optional()
    .or(z.literal("")),
});

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const indianMobileNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

export const userValidation = z
  .object({
    name: z.string().trim().min(3).max(30),
    aka: z.string().trim().min(3).optional().or(z.literal("")),
    bio: z.string().trim().min(50).max(1000).optional().or(z.literal("")),
    address: z.string().trim().min(10).max(1000),
    mobile: z.string().refine((value) => indianMobileNumberRegex.test(value), {
      message: "Invalid mobile number",
    }),
    emergency_number: z
      .string()
      .refine((value) => indianMobileNumberRegex.test(value), {
        message: "Invalid mobile number",
      }),
    email: z.string().email(),
    bikes: z.array(bikes),
    dob: z
      .string({
        required_error: "DOB is required",
      })
      .refine((date) => new Date(date) <= eighteenYearsAgo, {
        message: "You must be at least 18 years old to register",
      })
      .default(""),
    instagram: z
      .string()
      .trim()
      .min(1, { message: "Please enter a valid URL" })
      .url()
      .optional()
      .or(z.literal("")),
    facebook: z
      .string()
      .trim()
      .min(1, { message: "Please enter a valid URL" })
      .url()
      .optional()
      .or(z.literal("")),
    twitter: z
      .string()
      .trim()
      .min(1, { message: "Please enter a valid URL" })
      .url()
      .optional()
      .or(z.literal("")),
    pincode: z
      .string()
      .min(6, { message: "Invalid pincode" })
      .max(6, { message: "Invalid pincode" }),
    blood_group: z.enum(constants.bloodGroups as [string, ...string[]], {
      required_error: "Blood group is required",
    }),
    gender: z.enum(constants.genders as [string, ...string[]], {
      required_error: "Gender is required",
    }),
    state: z.enum(states as [string, ...string[]], {
      required_error: "State is required",
    }),
    city: z.string().trim().min(1, { message: "City is required" }),
  })
  .refine((data) => data.mobile !== data.emergency_number, {
    message: "Mobile and emergency number must be different",
    path: ["emergency_number"],
  });
