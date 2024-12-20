import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CellAction } from "@/pages/(admin)/managers/user/_components/cell-action";
import { TUser } from "@/types/type-user";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, User } from "lucide-react";

export const columns: ColumnDef<TUser>[] = [
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => (
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
                {row.original.avatar ? (
                    <img
                        src={row.original.avatar}
                        alt={`${row.original.last_name}'s avatar`}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        <User className="w-6 h-6 text-gray-400" />
                    </div>
                )}
            </div>
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Số điện thoại
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "is_admin",
        header: "Quyền",
        cell: ({ row }) => (
            <span
                className={cn(
                    "w-[70px] text-center inline-block rounded-full py-2 px-4 text-white",
                    row.original.role === "admin"
                        ? "bg-red-400"
                        : "bg-yellow-400"
                )}
            >
                {row.original.role === "admin" ? "Admin" : "User"}
            </span>
        ),
    },
    {
        accessorKey: "last_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Tên
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
