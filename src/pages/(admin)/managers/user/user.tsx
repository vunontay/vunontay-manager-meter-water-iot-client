import { useUser } from "@/hooks/user";
import { columns } from "@/pages/(admin)/managers/user/_components/columns";
import { DataTable } from "@/pages/(admin)/managers/user/_components/data-table";
import { ChartNoAxesGantt } from "lucide-react";

const AdminUserManagerPage = () => {
    const { getUsersQuery } = useUser();

    return (
        <div className="pt-6 pr-6 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight my-4 flex items-center gap-2">
                <ChartNoAxesGantt className="size-6" /> Quản lý người dùng
            </h1>
            <DataTable
                data={getUsersQuery.data?.data || []}
                columns={columns}
                pageSize={5}
            />
        </div>
    );
};

export default AdminUserManagerPage;
