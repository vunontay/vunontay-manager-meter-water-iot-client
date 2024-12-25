import { useSelector } from "react-redux";
import useMeasurement from "@/hooks/measurement";
import { RootState } from "@/stores/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ParkingMeterIcon as Meter, Droplet } from "lucide-react";

const UserMeasurementPage = () => {
    const userId = useSelector((state: RootState) => state?.auth?._id);
    const { getMeasurementUserQuery } = useMeasurement();
    const { data, isLoading } = getMeasurementUserQuery(userId as string);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="loader mb-4"></div>
                    <p>Đang tải dữ liệu, vui lòng đợi...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="container w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Dữ Liệu Đo Lường Của Người Dùng
            </h1>

            <Card className="overflow-hidden shadow-lg border border-gray-300 rounded-lg mb-8">
                <CardHeader className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-4 px-6">
                    <CardTitle className="flex items-center">
                        <Droplet className="mr-3" />
                        <span className="text-lg font-semibold">Tổng Quan</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-sm">
                                Tổng Lưu Lượng
                            </span>
                            <span className="text-xl font-bold">
                                {data?.data.totalFlow || 0} m³/h
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-sm">
                                Tổng Thể Tích
                            </span>
                            <span className="text-xl font-bold">
                                {data?.data.totalVolume || 0} m³
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-sm">
                                Tổng Số Tiền
                            </span>
                            <span className="text-xl font-bold">
                                {data?.data.totalAmount?.toLocaleString(
                                    "vi-VN",
                                    {
                                        style: "currency",
                                        currency: "VND",
                                    }
                                ) || "0 VND"}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {data?.data.meters?.map((meter, index) => (
                <Card
                    key={index}
                    className="overflow-hidden shadow-lg border border-gray-300 rounded-lg mb-8"
                >
                    <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6">
                        <CardTitle className="flex items-center">
                            <Meter className="mr-3" />
                            <span className="text-lg font-semibold">
                                Mã Đồng Hồ: {meter.code_meter}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Table className="border-collapse border border-gray-300 w-full text-sm text-left">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border border-gray-300 bg-gray-100 text-gray-800 text-center">
                                        Thông Tin
                                    </TableHead>
                                    <TableHead className="border border-gray-300 bg-gray-100 text-gray-800 text-right">
                                        Giá Trị
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="border border-gray-300 px-4 py-2">
                                        Lưu Lượng
                                    </TableCell>
                                    <TableCell className="border border-gray-300 px-4 py-2 text-right">
                                        {meter.flow} m³/h
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-gray-300 px-4 py-2">
                                        Thể Tích
                                    </TableCell>
                                    <TableCell className="border border-gray-300 px-4 py-2 text-right">
                                        {meter.volume} m³
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-gray-300 px-4 py-2">
                                        Giá Tiền Mỗi Đơn Vị
                                    </TableCell>
                                    <TableCell className="border border-gray-300 px-4 py-2 text-right">
                                        {meter.price_per_unit.toLocaleString(
                                            "vi-VN",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )}
                                        /m³
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-gray-300 px-4 py-2">
                                        Tổng Số Tiền
                                    </TableCell>
                                    <TableCell className="border border-gray-300 px-4 py-2 text-right">
                                        {meter.total_amount.toLocaleString(
                                            "vi-VN",
                                            {
                                                style: "currency",
                                                currency: "VND",
                                            }
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="border border-gray-300 px-4 py-2">
                                        Thời Gian
                                    </TableCell>
                                    <TableCell className="border border-gray-300 px-4 py-2 text-right">
                                        {new Date(
                                            meter.timestamp
                                        ).toLocaleString("vi-VN", {
                                            timeZone: "Asia/Ho_Chi_Minh",
                                        })}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}

            {data?.data.meters?.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">
                        Không có đồng hồ đo lường nào được tìm thấy.
                    </p>
                </div>
            )}
        </section>
    );
};

export default UserMeasurementPage;
