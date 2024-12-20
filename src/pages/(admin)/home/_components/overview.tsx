import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface IOverviewProps {
    data: { name: string; total: number }[];
}

export function Overview({ data }: IOverviewProps) {
    return (
        <ChartContainer
            config={{
                total: {
                    label: "Total",
                    color: "url(#gradient)",
                },
            }}
            className="h-[350px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                    />
                    <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value: number) => `${value}m³`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                        dataKey="total"
                        fill="url(#gradient)"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={50}
                    />
                    <defs>
                        <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="hsl(var(--primary))" />
                            <stop
                                offset="100%"
                                stopColor="hsl(var(--chart-2))"
                            />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
