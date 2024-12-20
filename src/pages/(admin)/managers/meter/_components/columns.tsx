import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CellAction } from "@/pages/(admin)/managers/meter/_components/cell-action";
import { TMeter } from "@/types/type-meter";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<TMeter>[] = [
    {
        accessorKey: "code_meter",
        header: "Mã Đồng Hồ",
    },
    {
        accessorKey: "location",
        header: "Vị trí",
        cell: ({ row }) => (
            <span className="text-sm">
                {row.original.note ? `${row.original.note}, ` : null}
                {row.original.location?.name}
            </span> // Hiển thị tên vị trí từ object location
        ),
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => (
            <span
                className={cn(
                    "w-[100px] text-center inline-block rounded-full py-2 px-4 text-white",
                    row.original.status === "active"
                        ? "bg-green-400"
                        : "bg-red-400"
                )}
            >
                {row.original.status}
            </span>
        ),
    },
    {
        accessorKey: "installation_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Ngày tạo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <span className="text-sm">
                {new Date(row.original.installation_date).toLocaleDateString()}{" "}
            </span>
        ),
    },

    {
        accessorKey: "user",
        header: "Người dùng",
        cell: ({ row }) => (
            <span className="text-sm">
                {row.original.user?.first_name} {row.original.user?.last_name}
            </span>
        ),
    },

    {
        id: "actions",
        header: "",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
