import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstname: z.string("First name is required"),
  lastname: z.string().optional(),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const loginPostRequestBodySchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
