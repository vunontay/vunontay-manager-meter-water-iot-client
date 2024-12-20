import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useMeasurement from "@/hooks/measurement";
import { TMeasurement } from "@/types/type-measurement";
import { formatDate } from "@/utils/util";

interface IMeasurementDialog {
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
    measurementData: TMeasurement;
}

const MeasurementDialog = ({
    isOpen,
    onClose,
    measurementData,
}: IMeasurementDialog) => {
    const { getMeasurementQuery } = useMeasurement();
    const measurements = getMeasurementQuery(measurementData.code_meter).data
        ?.data;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto hide-scrollbar">
                <DialogHeader>
                    <DialogTitle>Xem chi tiết tiêu thụ</DialogTitle>
                </DialogHeader>

                <div className="max-h-[60vh] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Phiên dữ liệu</TableHead>

                                <TableHead>Thời gian</TableHead>
                                <TableHead>Lưu lượng (m³/h)</TableHead>
                                <TableHead>Thể tích (m³)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {measurements?.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">
                                        {formatDate(item.timestamp)}
                                    </TableCell>
                                    <TableCell>
                                        {item.flow.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {item.volume.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MeasurementDialog;
