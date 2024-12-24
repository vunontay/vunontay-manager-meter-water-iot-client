import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TMeasurement } from "@/types/type-measurement";

interface IMeterTable {
    data: TMeasurement[];
}

const MeterTable = ({ data }: IMeterTable) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Mã đồng hồ</TableHead>
                    <TableHead>Lưu lượng</TableHead>
                    <TableHead>Thể tích</TableHead>
                    <TableHead>Số lần đo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((meter) => (
                    <TableRow key={meter._id}>
                        <TableCell>{meter.code_meter}</TableCell>
                        <TableCell>{meter.flow}</TableCell>
                        <TableCell>{meter.volume}</TableCell>
                        <TableCell>{meter.measurementsCount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default MeterTable;
