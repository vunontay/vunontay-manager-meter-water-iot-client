import { z } from "zod";

export const locationSchema = z.object({
    name: z.string().min(1, "Tên là bắt buộc"),
    longitude: z
        .number()
        .min(-180)
        .max(180, "Kinh độ phải nằm trong khoảng từ -180 đến 180"),
    latitude: z
        .number()
        .min(-90)
        .max(90, "Vĩ độ phải nằm trong khoảng từ -90 đến 90"),
    note: z.string().optional(),
});

export type TLocationAddValues = z.infer<typeof locationSchema>;
