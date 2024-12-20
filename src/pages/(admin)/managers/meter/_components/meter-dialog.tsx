import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPinIcon as MapPinPlus } from "lucide-react";

import { TLocation, TLocationSearch } from "@/types/type-location";
import { TLocationAddValues } from "@/validations/location";
import useLocation from "@/hooks/location";
import MeterForm from "@/pages/(admin)/managers/meter/_components/meter-form";
import Map from "@/pages/(admin)/managers/meter/_components/map";
import LocationSearch from "@/pages/(admin)/managers/meter/_components/location-search";

interface IMeterDialog {
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
}

const MeterDialog = ({ isOpen, onClose }: IMeterDialog) => {
    const { addLocationMutation } = useLocation();

    const [currentStep, setCurrentStep] = useState(1);
    const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] =
        useState<TLocationSearch | null>(null);
    const [locationConfirmed, setLocationConfirmed] = useState<
        TLocation | undefined
    >();

    const handleCreatePosition = () => setIsMapDialogOpen(true);

    const handleSelectedPosition = (item: TLocationSearch) =>
        setSelectedPosition(item);

    const handleLocationConfirmed = (confirmed: TLocationAddValues) => {
        if (confirmed) {
            addLocationMutation.mutate(confirmed, {
                onSuccess: (data) => {
                    setLocationConfirmed(data.data);
                    setIsMapDialogOpen(false);
                    setCurrentStep(2);
                },
            });
        }
    };

    const handleReset = () => {
        // Reset all values and go back to step 1
        setCurrentStep(1);
        setSelectedPosition(null);
        setLocationConfirmed(undefined);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] overflow-y-auto hide-scrollbar">
                <DialogHeader>
                    <DialogTitle>
                        Tạo mới đồng hồ - Bước {currentStep}
                    </DialogTitle>
                </DialogHeader>
                {currentStep === 1 && (
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Chọn vị trí đồng hồ</Label>
                            <Button
                                onClick={handleCreatePosition}
                                variant="outline"
                            >
                                Tạo vị trí{" "}
                                <MapPinPlus className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <MeterForm
                        locationConfirmed={locationConfirmed}
                        handleReset={handleReset}
                    />
                )}
            </DialogContent>

            <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
                <DialogContent className="h-[90vh] max-w-6xl w-full p-0">
                    <DialogHeader className="hidden">
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="relative h-full rounded-lg overflow-hidden">
                        <Map
                            selectedPosition={selectedPosition}
                            setIsMapDialogOpen={setIsMapDialogOpen}
                            onLocationConfirmed={handleLocationConfirmed}
                        />
                        <div className="absolute top-4 right-4 w-80 z-[1002]">
                            <LocationSearch
                                onSelectPosition={handleSelectedPosition}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Dialog>
    );
};

export default MeterDialog;
