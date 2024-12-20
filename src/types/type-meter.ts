import { TLocation } from "@/types/type-location";
import { TUser } from "@/types/type-user";

export type TMeter = {
    code_meter: string;
    user?: TUser;
    location?: TLocation;
    status: "active" | "inactive" | "maintenance" | "initial";
    _id: string;
    installation_date: string;
    note: string;
};
