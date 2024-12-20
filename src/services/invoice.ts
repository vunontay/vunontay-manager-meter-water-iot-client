import { API_URL } from "@/constants/route";
import { TInvoice } from "@/types/type-invoice";
import { TResponse } from "@/types/utils";
import { AxiosResponse } from "axios";
import axiosInstance from "@/services/axios";

class InvoiceService {
    async getInvoices(): Promise<TResponse<TInvoice[]>> {
        const response: AxiosResponse<TResponse<TInvoice[]>> =
            await axiosInstance.get(`${API_URL.INVOICE.INDEX}`);
        return response.data;
    }
    async deleteInvoices(): Promise<TResponse<unknown>> {
        const response: AxiosResponse<TResponse<unknown>> =
            await axiosInstance.delete(`${API_URL.INVOICE.INDEX}`);
        return response.data;
    }

    async sendInvoices(): Promise<TResponse<unknown>> {
        const response: AxiosResponse<TResponse<unknown>> =
            await axiosInstance.post(
                `${API_URL.EMAIL.INDEX}${API_URL.EMAIL.SEND_ALL}`
            );
        return response.data;
    }
}

const invoiceService = new InvoiceService();
export default invoiceService;
