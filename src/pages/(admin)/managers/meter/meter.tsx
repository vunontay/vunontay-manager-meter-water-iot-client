import { Button } from "@/components/ui/button";
import useMeter from "@/hooks/meter";
import { columns } from "@/pages/(admin)/managers/meter/_components/columns";
import MeterDialog from "@/pages/(admin)/managers/meter/_components/meter-dialog";
import { DataTable } from "@/pages/(admin)/managers/user/_components/data-table";
import { closeCollapse } from "@/stores/slices/sidebar";
import { CirclePlus, Gauge } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const AdminMeterManagerPage = () => {
    const { getMetersQuery } = useMeter();
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpenDialog) {
            dispatch(closeCollapse());
        }
    }, [isOpenDialog, dispatch]);

    return (
        <div className="pt-6 pr-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight my-4 flex items-center gap-2">
                    <Gauge className="size-6" /> Quản lý đồng hồ
                </h1>

                <Button onClick={() => setIsOpenDialog(true)}>
                    Thêm đồng hồ <CirclePlus />
                </Button>

                <MeterDialog
                    onClose={() => setIsOpenDialog(false)}
                    isOpen={isOpenDialog}
                />
            </div>

            <DataTable
                data={getMetersQuery.data?.data || []}
                columns={columns}
                pageSize={5}
            />
        </div>
    );
};

export default AdminMeterManagerPage;
