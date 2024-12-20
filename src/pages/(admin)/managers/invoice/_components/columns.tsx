import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TInvoice } from "@/types/type-invoice";
import { convertToVND } from "@/utils/util";

export const columns: ColumnDef<TInvoice>[] = [
    {
        accessorKey: "user.first_name",
        header: "Tên Người Dùng",
        cell: ({ row }) => (
            <span className="text-sm">
                {row.original.user?.first_name} {row.original.user?.last_name}
            </span>
        ),
    },
    {
        accessorKey: "user.phone",
        header: "Số điện thoại",
        cell: ({ row }) => (
            <span className="text-sm">{row.original.user?.phone}</span>
        ),
    },
    {
        accessorKey: "volume_consumed",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Tổng Lượng Nước (m³)
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="text-sm">{row.original.volume_consumed}</span>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "total_amount", // Tổng số tiền
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Tổng Tiền (VNĐ)
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="text-sm">
                {convertToVND(row.original.total_amount)}
            </span>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: "Trạng Thái",
        cell: ({ row }) => {
            const status = row.original.status;
            let statusClass = "";
            switch (status) {
                case "init":
                    statusClass = "bg-yellow-400 text-black";
                    break;
                case "paid":
                    statusClass = "bg-green-400 text-white";
                    break;
                case "unpaid":
                    statusClass = "bg-red-400 text-white";
                    break;
                default:
                    statusClass = "bg-gray-400 text-white";
            }

            return (
                <span
                    className={`inline-block rounded-full py-2 px-4 ${statusClass}`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "invoice_detail", // Hiển thị thông tin chi tiết đồng hồ
        header: "Mã Đồng Hồ",
        cell: ({ row }) => (
            <span className="text-sm">
                {row.original.invoice_detail?.map((detail, index: number) => (
                    <div key={index}>{detail.meter.code_meter}</div>
                ))}
            </span>
        ),
    },
    {
        accessorKey: "start_period", // Ngày bắt đầu
        header: "Ngày Bắt Đầu",
        cell: ({ row }) => (
            <span className="text-sm">
                {new Date(row.original.start_period).toLocaleDateString()}
            </span>
        ),
    },
    {
        accessorKey: "end_period", // Ngày kết thúc
        header: "Ngày Đến Hạn",
        cell: ({ row }) => (
            <span className="text-sm">
                {new Date(row.original.end_period).toLocaleDateString()}
            </span>
        ),
    },
    // {
    //     id: "actions",
    //     header: "",
    //     cell: ({ row }) => <CellAction data={row.original} />,
    // },
];
