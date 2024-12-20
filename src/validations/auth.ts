import { requiredString } from "@/validations/util";
import { z } from "zod";

export const registerSchema = z.object({
    // first_name: requiredString.min(1, "Must be at least 1 characters"),
    // last_name: requiredString.min(1, "Must be at least 1 characters"),
    email: requiredString.email("Invalid email address"),
    phone: requiredString.min(10, "Phone number must be 10 digits"),
    password: requiredString.min(8, "Must be at least 8 characters"),
});

export type TRegisterValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    phone: requiredString.min(10, "Phone number must be 10 digits"),
    password: requiredString.min(8, "Must be at least 8 characters"),
});

export type TLoginValues = z.infer<typeof loginSchema>;
