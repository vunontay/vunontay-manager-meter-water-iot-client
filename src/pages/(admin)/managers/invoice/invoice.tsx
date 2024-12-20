import { Button } from "@/components/ui/button";
import { Mails, Receipt, RefreshCw } from "lucide-react";
import useInvoice from "@/hooks/invoice";
import { DataTable } from "@/pages/(admin)/managers/invoice/_components/data-table";
import { columns } from "@/pages/(admin)/managers/invoice/_components/columns";
import { toast } from "sonner";
import { LoadingButton } from "@/components/customs/button/loading-button";

const AdminInvoicePage = () => {
    const { getInvoicesQuery, sendInvoicesMutation } = useInvoice();
    const data = getInvoicesQuery.data?.data;

    const handleRefresh = () => {
        getInvoicesQuery.refetch();
        toast.success(getInvoicesQuery.data?.message);
    };

    // const handleDeleteAll = () => {
    //     deleteInvoicesMutation.mutate();
    // };

    const handleSendInvoices = () => {
        sendInvoicesMutation.mutate();
    };
    return (
        <div className="pt-6 pr-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight my-4 flex items-center gap-2">
                    <Receipt className="size-6" /> Quản lý hóa đơn
                </h1>
                <div className="flex gap-2">
                    <LoadingButton
                        isLoading={sendInvoicesMutation.isPending}
                        onClick={handleSendInvoices}
                        className="bg-green-500"
                    >
                        Gửi hóa đơn đến Email <Mails />
                    </LoadingButton>
                    <Button onClick={handleRefresh}>
                        Cập nhật dữ liệu <RefreshCw />
                    </Button>
                    {/* <Button onClick={handleDeleteAll} variant={"destructive"}>
                        Xóa tất cả dữ liệu <Trash2 />
                    </Button> */}
                </div>
            </div>

            <DataTable data={data || []} columns={columns} pageSize={5} />
        </div>
    );
};

export default AdminInvoicePage;
