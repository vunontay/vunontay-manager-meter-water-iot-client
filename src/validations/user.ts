import { requiredString } from "@/validations/util";
import { z } from "zod";

export const userEditSchema = z.object({
    first_name: requiredString.min(1, "Address must be at least 1 characters."),
    last_name: requiredString.min(1, "Address must be at least 1 characters."),
    email: requiredString.email("Invalid email address"),
    avatar: requiredString.url("Img URL must be valid"),
});

export type TUserEditValues = z.infer<typeof userEditSchema>;
