import { TMeter } from "@/types/type-meter";
import { TUser } from "@/types/type-user";

export type TInvoiceDetail = {
    _id: string;
    invoice: string;
    meter: TMeter;
    price_per_unit: number;
};

export type TInvoice = {
    _id: string;
    user: TUser;
    start_period: string;
    end_period: string;
    volume_consumed: number;
    total_amount: number;
    status: "init" | "paid" | "unpaid";
    invoice_detail: TInvoiceDetail[];
};
