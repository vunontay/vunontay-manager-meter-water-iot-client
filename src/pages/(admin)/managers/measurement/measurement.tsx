import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMeasurement from "@/hooks/measurement";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import {
    ChartNoAxesCombined,
    ChevronDown,
    Loader2,
    RefreshCw,
} from "lucide-react";

const AdminMeasurementPage = () => {
    const {
        getMeasurementsQuery,
        updateMeasurementMutation,
        getOneMeasurementMutation,
    } = useMeasurement();

    const meters = getMeasurementsQuery.data?.data || [];

    const handleGetOneMeasurement = (code_meter: string) => {
        getOneMeasurementMutation.mutate(code_meter);
    };

    return (
        <div className="pt-6 pr-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight my-4 flex items-center gap-2">
                    <ChartNoAxesCombined className="size-6" /> Quản lý tiêu thụ
                </h1>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="w-[160px]">
                            <Button variant="outline">
                                Chọn đồng hồ{" "}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-[160px]">
                            {meters.map((meter) => (
                                <DropdownMenuItem
                                    key={meter._id}
                                    onClick={() =>
                                        handleGetOneMeasurement(
                                            meter.code_meter
                                        )
                                    }
                                    className="flex items-center justify-between"
                                >
                                    <span>Đồng hồ {meter.code_meter}</span>
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            meter._id
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    />
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        onClick={() => updateMeasurementMutation.mutate()}
                        disabled={updateMeasurementMutation.isPending}
                    >
                        {updateMeasurementMutation.isPending && (
                            <Loader2 className="animate-spin mr-2" size={16} />
                        )}
                        Cập nhật dữ liệu <RefreshCw className="ml-2" />
                    </Button>
                </div>
            </div>

            <DataTable data={meters} columns={columns} pageSize={5} />
        </div>
    );
};

export default AdminMeasurementPage;
