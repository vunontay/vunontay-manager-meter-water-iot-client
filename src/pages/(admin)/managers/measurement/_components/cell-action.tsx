import { useEffect, useState } from "react";

import { TMeasurement } from "@/types/type-measurement";
import { DropdownMenuActions } from "@/pages/(admin)/managers/measurement/_components/dropdown-action";
import MeasurementDialog from "@/pages/(admin)/managers/measurement/_components/measurement-dialog";
import { useDispatch } from "react-redux";
import { closeCollapse } from "@/stores/slices/sidebar";

interface ICellAction {
    data: TMeasurement;
}

export function CellAction({ data }: ICellAction) {
    const dispatch = useDispatch();
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
            />
            <MeasurementDialog
                isOpen={measurementDialogState.open}
                onClose={closeMeasurementDialog}
                measurementData={data}
            />
        </div>
    );
}
