import { TMeasurement } from "@/types/type-measurement";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellAction } from "@/pages/(admin)/managers/measurement/_components/cell-action";

export const columns: ColumnDef<TMeasurement>[] = [
    {
        accessorKey: "code_meter",
        header: "Mã Đồng Hồ",
        enableSorting: true,
    },
    {
        accessorKey: "flow",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Lưu Lượng (m³/h)
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <span className="text-sm">{row.original.flow}</span>,
        enableSorting: true,
    },
    {
        accessorKey: "volume",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Thể Tích (m³)
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="text-sm">{row.original.volume}</span>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "measurementsCount",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Số Bản Ghi
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="text-sm">{row.original.measurementsCount}</span>
        ),
        enableSorting: true,
    },

    {
        id: "actions",
        header: "",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
