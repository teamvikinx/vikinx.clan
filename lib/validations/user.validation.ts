import * as z from "zod";

const bikes = z.object({
  name: z
    .string()
    .min(3, { message: "Bike name must contain at least 3 character(s)" }),
  pet_name: z.string().optional(),
});

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export const userValidation = z
  .object({
    name: z.string().min(3).max(30),
    aka: z.string().optional(),
    bio: z.string().min(30).max(1000),

    mobile: z
      .string()
      .min(10, { message: "Invalid mobile number" })
      .max(12, { message: "Invalid mobile number" }),
    emergency_number: z
      .string()
      .min(10, { message: "Invalid mobile number" })
      .max(12, { message: "Invalid mobile number" }),
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
    instagram: z.string().url({ message: "Invalid URL" }).optional(),
    facebook: z.string().url({ message: "Invalid URL" }).optional(),
    twitter: z.string().url({ message: "Invalid URL" }).optional(),
    blood_group: z.string({ required_error: "Blood group is required field" }),
  })
  .refine((data) => data.mobile !== data.emergency_number, {
    message: "Mobile and emergency number must be different",
    path: ["emergency_number"],
  });
