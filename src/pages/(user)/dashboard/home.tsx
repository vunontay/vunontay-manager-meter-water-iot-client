import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

const chartData = [
    { month: "January", consumption: 23 },
    { month: "February", consumption: 19 },
    { month: "March", consumption: 25 },
    { month: "April", consumption: 22 },
    { month: "May", consumption: 18 },
    { month: "June", consumption: 30 },
    { month: "July", consumption: 35 },
    { month: "August", consumption: 32 },
    { month: "September", consumption: 29 },
    { month: "October", consumption: 27 },
    { month: "November", consumption: 20 },
    { month: "December", consumption: 24 },
];

const barChartData = [
    { name: "Week 1", total: 120 },
    { name: "Week 2", total: 140 },
    { name: "Week 3", total: 130 },
    { name: "Week 4", total: 150 },
];

const summaryData = {
    currentMonth: 23,
    lastMonth: 19,
    projectedBill: 460000,
};

const chartConfig = {
    consumption: {
        label: "Water Consumption (m³)",
        color: "hsl(var(--primary))",
    },
};

const barChartConfig = {
    total: {
        label: "Total Consumption (m³)",
        color: "hsl(var(--primary))",
    },
};

const UserHomePage = () => {
    return (
        <div className="container mx-auto pt-6 px-4 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight my-4 flex items-center gap-2">
                <LayoutDashboard className="size-6" /> Dashboard
            </h1>

            {/* Tổng Quan */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Lượng tiêu thụ tháng này
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">
                            {summaryData.currentMonth} m³
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% so với tháng trước
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tăng trưởng tháng
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-success">
                            {(
                                ((summaryData.currentMonth -
                                    summaryData.lastMonth) /
                                    summaryData.lastMonth) *
                                100
                            ).toFixed(1)}
                            %
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Tăng so với tháng trước
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Hóa đơn dự kiến
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-warning">
                            {summaryData.projectedBill.toLocaleString()} VNĐ
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Tăng nhẹ so với tháng trước
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Cảnh báo
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-error">1</div>
                        <p className="text-xs text-muted-foreground">
                            Cảnh báo rò rỉ
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Biểu Đồ */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">
                            Xu hướng tiêu thụ nước
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 overflow-x-auto">
                        <ChartContainer
                            config={chartConfig}
                            className="h-[250px] sm:h-[300px] w-full"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tickFormatter={(value) =>
                                            value.slice(0, 3)
                                        }
                                    />
                                    <YAxis />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <ChartLegend
                                        content={<ChartLegendContent />}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="consumption"
                                        stroke="var(--color-consumption)"
                                        strokeWidth={2}
                                        dot={{ r: 5 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">
                            Tổng tiêu thụ theo tuần
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 overflow-x-auto">
                        <ChartContainer
                            config={barChartConfig}
                            className="h-[250px] sm:h-[300px] w-full"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value: number) =>
                                            `${value} m³`
                                        }
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <ChartLegend
                                        content={<ChartLegendContent />}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="var(--color-total)"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserHomePage;
