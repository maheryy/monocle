import { z } from "zod";

export const LoginData = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// TODO: Add validation for website, address, kbis, phone
export const RegisterData = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string().default("Monoclub"),
  website: z.string().default("http://localhost:8080"),
  address: z.string().default("234 Peachtree St NE, Atlanta, GA 30303"),
  kbis: z.string().default("Extrait Kbis"),
  phone: z.string().default("0923452323"),
});
