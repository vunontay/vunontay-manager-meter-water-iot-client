import invoiceService from "@/services/invoice";
import { TInvoice } from "@/types/type-invoice";
import { TResponse } from "@/types/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useInvoice = () => {
    const queryClient = useQueryClient();
    const getInvoicesQuery = useQuery<TResponse<TInvoice[]>, Error>({
        queryKey: ["invoices"],
        queryFn: () => invoiceService.getInvoices(),
        staleTime: 5 * 60 * 1000,
        select: (response) => {
            return {
                message: response.message,
                data: response.data,
            };
        },
    });
    const deleteInvoicesMutation = useMutation<TResponse<unknown>, Error>({
        mutationFn: () => invoiceService.deleteInvoices(),
        onSuccess: (response) => {
            toast.success(response.message);
            queryClient.invalidateQueries({
                queryKey: ["invoices"],
            });
        },
        onError: (response) => toast.error(response.message),
    });

    const sendInvoicesMutation = useMutation<TResponse<unknown>, Error>({
        mutationFn: () => invoiceService.sendInvoices(),
        onSuccess: (response) => {
            toast.success(response.message);
        },
        onError: (response) => toast.error(response.message),
    });
    return {
        getInvoicesQuery,
        deleteInvoicesMutation,
        sendInvoicesMutation,
    };
};

export default useInvoice;
