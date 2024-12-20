import { TAddress } from "@/types/type-address";

export type TUser = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: "user" | "admin";
    avatar: string;
    address: TAddress;
};
