import { Button } from "@/components/ui/button";
import useMeasurement from "@/hooks/measurement";
import { columns } from "@/pages/(admin)/managers/measurement/_components/columns";
import { DataTable } from "@/pages/(admin)/managers/measurement/_components/data-table";
import { ChartNoAxesCombined, RefreshCw } from "lucide-react";

const AdminMeasurementPage = () => {
    const { getMeasurementsQuery, updateMeasurementMutation } =
        useMeasurement();

    return (
        <div className="pt-6 pr-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight my-4 flex items-center gap-2">
                    <ChartNoAxesCombined className="size-6" /> Quản lý tiêu thụ
                </h1>

                <Button onClick={() => updateMeasurementMutation.mutate()}>
                    Cập nhật dữ liệu <RefreshCw />
                </Button>
            </div>

            <DataTable
                data={getMeasurementsQuery.data?.data || []}
                columns={columns}
                pageSize={5}
            />
        </div>
    );
};

export default AdminMeasurementPage;
