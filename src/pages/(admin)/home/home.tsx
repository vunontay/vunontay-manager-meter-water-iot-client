import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/user";
import { Overview } from "@/pages/(admin)/home/_components/overview";
import { Activity, Gauge, LayoutDashboard, MapPin, Users } from "lucide-react";
import useLocation from "@/hooks/location";
import useMeasurement from "@/hooks/measurement";
import useMeter from "@/hooks/meter";
import useStats from "@/hooks/stats";
import MeterTable from "@/pages/(admin)/home/_components/meter-table";

const AdminHomePage = () => {
    const { getUsersQuery } = useUser();
    const { getMetersQuery } = useMeter();
    const { getLocationsQuery } = useLocation();
    const { getMeasurementsQuery } = useMeasurement();
    const { getStatsQuery } = useStats();

    return (
        <div className="pt-6 pr-6 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight my-4 flex items-center gap-2">
                <LayoutDashboard className="size-6" /> Dashboard - Quản lý Đồng
                Hồ Nước
            </h2>

            <div className="flex-1 space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tổng số đồng hồ nước
                            </CardTitle>
                            <Gauge className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {getMetersQuery.data?.data.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% so với tháng trước
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tổng người dùng
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{getUsersQuery.data?.data.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +180.1% so với tháng trước
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tổng vị trí
                            </CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {getLocationsQuery.data?.data.length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +19% so với tháng trước
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Số đồng hồ hoạt động
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    getMetersQuery.data?.data.filter(
                                        (meter) => meter.status === "active"
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +15.4% so với tháng trước
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-7">
                    <Card className="lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Biểu đồ thống kê lưu lượng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Overview data={getStatsQuery.data?.data || []} />
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Thống kê đồng hồ nước</CardTitle>
                            <CardDescription>
                                Dữ liệu từ{" "}
                                {getMeasurementsQuery.data?.data.length} đồng hồ
                                nước
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MeterTable
                                data={getMeasurementsQuery.data?.data || []}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
