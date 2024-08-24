import { z } from "zod";

export const SIGNUP_FORM_SCHEMA = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(1, { message: "Name is required" }),

    email: z.string({ message: "Email is required" }).email({
      message: "Please enter a valid email address",
    }),
    password: z
      .string({ message: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",

    path: ["confirmPassword"],
  });

export const LOGIN_FORM_SCHEMA = z.object({
  email: z.string({ message: "Email is required" }),
  password: z.string({ message: "Password is required" }),
});
