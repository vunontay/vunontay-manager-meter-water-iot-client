import { requiredString } from "@/validations/util";
import { z } from "zod";

export const meterSchema = z.object({
    code_meter: requiredString.min(1, "Must be at least 6 characters."),
    user_id: requiredString.min(24, "Must be at least 24 characters."),
    location_id: requiredString.min(24, "Must be at least 10 characters."),
    status: z.enum(["active", "inactive", "maintenance", "initial"]),
});

export const meterEditSchema = z.object({
    status: z.enum(["active", "inactive", "maintenance", "initial"]),
    note: z.string().optional(),
    location_id: requiredString.min(24, "Must be at least 24 characters."),
});

export type TAssignMeterValues = z.infer<typeof meterSchema>;
export type TEditMeterValues = z.infer<typeof meterEditSchema>;
