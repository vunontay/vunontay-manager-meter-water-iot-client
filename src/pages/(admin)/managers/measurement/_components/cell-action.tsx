import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TMeasurement } from "@/types/type-measurement";
import { DropdownMenuActions } from "./dropdown-action";
import MeasurementDialog from "./measurement-dialog";
import { closeCollapse } from "@/stores/slices/sidebar";
import useMeasurement from "@/hooks/measurement";

interface ICellAction {
    data: TMeasurement;
}

export function CellAction({ data }: ICellAction) {
    const dispatch = useDispatch();
    const { resetMeasurementMutation } = useMeasurement();

    const [measurementDialogState, setMeasurementDialogState] = useState({
        open: false,
        type: "" as "view" | "delete" | "",
    });

    const openMeasurementDialog = (type: "view" | "delete") => {
        setMeasurementDialogState({ open: true, type });
    };

    const closeMeasurementDialog = () => {
        setMeasurementDialogState({ open: false, type: "" });
    };

    const handleReset = () => {
        resetMeasurementMutation.mutate(data.code_meter);
    };

    useEffect(() => {
        if (measurementDialogState.open) {
            dispatch(closeCollapse());
        }
    }, [measurementDialogState, dispatch]);

    return (
        <div className="flex items-center gap-2">
            <DropdownMenuActions
                onViewDetail={() => openMeasurementDialog("view")}
                onDelete={() => openMeasurementDialog("delete")}
                onReset={handleReset}
            />
            <MeasurementDialog
                isOpen={measurementDialogState.open}
                onClose={closeMeasurementDialog}
                measurementData={data}
            />
        </div>
    );
}
