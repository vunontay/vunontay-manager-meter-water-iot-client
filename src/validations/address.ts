import { requiredString } from "@/validations/util";
import { z } from "zod";

export const addressAddSchema = z.object({
    city: requiredString.min(1, "Tên thành phố không được để trống."),
    district: requiredString.min(1, "Tên quận/huyện không được để trống."),
    commune: requiredString.min(1, "Tên phường/xã không được để trống."),
    note: z.string().optional(), // `note` is optional
    more_info: z.string().optional(), // `more_info` is optional
    user_id: requiredString.min(24, "ID người dùng phải có ít nhất 24 ký tự."),
});

export type TAddressAddValues = z.infer<typeof addressAddSchema>;
