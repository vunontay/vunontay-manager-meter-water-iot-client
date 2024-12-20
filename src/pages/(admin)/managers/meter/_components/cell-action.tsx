import { useState } from "react";

import { DropdownMenuActions } from "@/pages/(admin)/managers/meter/_components/dropdown-action";
import { TMeter } from "@/types/type-meter";
import UpdateDialog from "@/pages/(admin)/managers/meter/_components/update-dialog";

interface ICellAction {
    data: TMeter;
}

export function CellAction({ data }: ICellAction) {
    const [meterDialogState, setMeterDialogState] = useState({
        open: false,
        type: "" as "edit" | "delete" | "",
    });

    const openMeterDialog = (type: "edit" | "delete") => {
        setMeterDialogState({ open: true, type });
    };
    const closeMeterDialog = () => {
        setMeterDialogState({ open: false, type: "" });
    };

    return (
        <div className="flex items-center gap-2">
            <DropdownMenuActions
                onEdit={() => openMeterDialog("edit")}
                onDelete={() => openMeterDialog("delete")}
            />

            <UpdateDialog
                meterData={data}
                isOpen={meterDialogState.open}
                onClose={closeMeterDialog}
                type={meterDialogState.type}
            />
        </div>
    );
}
