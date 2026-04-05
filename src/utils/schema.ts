import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "EMAIL IS REQUIRED").email("INVALID EMAIL FORMAT"),
  password: z.string().min(1, "PASSWORD IS REQUIRED").min(6, "PASSWORD MUST BE AT LEAST 6 CHARACTERS"),
});

export const registerSchema = z.object({
  fullName: z.string().min(1, "FULL NAME IS REQUIRED").max(50, "NAME TOO LONG"),
  email: z.string().min(1, "EMAIL IS REQUIRED").email("INVALID EMAIL FORMAT"),
  password: z.string().min(1, "PASSWORD IS REQUIRED").min(6, "PASSWORD MUST BE AT LEAST 6 CHARACTERS"),
  confirmPassword: z.string().min(1, "CONFIRM YOUR PASSWORD"),
  agreeTerms: z.boolean().refine(val => val === true, "YOU MUST AGREE TO PROCEED"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "PASSWORDS DO NOT MATCH",
  path: ["confirmPassword"],
});

export const createAppSchema = z.object({
  name: z.string().min(1, "App name is required").max(100, "Name too long"),
  logo_url: z.string().url("Invalid URL format").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type CreateAppSchemaType = z.infer<typeof createAppSchema>;
