import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // New import
import useLocation from "@/hooks/location";
import useMeter from "@/hooks/meter";
import LocationSearch from "@/pages/(admin)/managers/meter/_components/location-search";
import Map from "@/pages/(admin)/managers/meter/_components/map";
import { TLocation, TLocationSearch } from "@/types/type-location";
import { TMeter } from "@/types/type-meter";
import { TLocationAddValues } from "@/validations/location";
import { meterEditSchema, TEditMeterValues } from "@/validations/meter";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IUpdateDialog {
    type: "edit" | "delete" | "";
    isOpen: boolean;
    onClose: () => void;
    meterData: TMeter;
}

const UpdateDialog = ({ isOpen, onClose, type, meterData }: IUpdateDialog) => {
    const { editLocationMutation } = useLocation();
    const { editMeterMutation, deleteMeterMutation } = useMeter();
    const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] =
        useState<TLocationSearch | null>(null);

    const [locationConfirmed, setLocationConfirmed] = useState<
        TLocation | undefined
    >();

    const form = useForm<z.infer<typeof meterEditSchema>>({
        resolver: zodResolver(meterEditSchema),
        defaultValues: {
            location_id: locationConfirmed?._id || meterData.location?._id,
            note: "",
            status: meterData.status,
        },
    });

    const handleCreatePosition = () => setIsMapDialogOpen(true);

    const handleSelectedPosition = (item: TLocationSearch) =>
        setSelectedPosition(item);

    const handleLocationConfirmed = (confirmed: TLocationAddValues) => {
        editLocationMutation.mutate(
            {
                locationId:
                    (locationConfirmed?._id as string) ||
                    (meterData.location?._id as string),
                locationData: confirmed,
            },
            {
                onSuccess: (data) => {
                    setLocationConfirmed(data.data);
                    setIsMapDialogOpen(false);
                },
            }
        );
    };

    const onSubmit = (values: TEditMeterValues | TMeter) => {
        const meterValue = {
            ...values,
            location_id:
                locationConfirmed?._id || (meterData.location?._id as string),
        };

        if (type === "edit") {
            editMeterMutation.mutate(
                {
                    meterId: meterData.code_meter,
                    meterData: meterValue,
                },
                {
                    onSuccess: () => {
                        form.reset({
                            location_id:
                                locationConfirmed?._id ||
                                meterData.location?._id,
                            note: "",
                            status: "active",
                        });
                        onClose();
                    },
                }
            );
        } else if (type === "delete") {
            deleteMeterMutation.mutate(meterData.code_meter);
            onClose();
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-h-[80vh] overflow-y-auto hide-scrollbar">
                    <DialogHeader>
                        <DialogTitle>
                            {type === "edit"
                                ? "Sửa thông tin"
                                : "Xóa tài khoản"}
                        </DialogTitle>
                    </DialogHeader>
                    {type === "edit" ? (
                        <>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                >
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Vị trí thực
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập vị trí chính xác..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Trạng thái
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="flex flex-col space-y-2"
                                                    >
                                                        <FormItem className="flex items-center space-x-4 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="active" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Hoạt động
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-4 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="inactive" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Không hoạt động
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-4 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="maintenance" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Bảo trì
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-4 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="initial" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Khởi tạo
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        onClick={handleCreatePosition}
                                        variant="outline"
                                        type="button"
                                    >
                                        Tạo vị trí{" "}
                                        <MapPinPlus className="ml-2 h-4 w-4" />
                                    </Button>

                                    <div className="flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={onClose}
                                        >
                                            Hủy bỏ
                                        </Button>
                                        <Button type="submit">
                                            Lưu thay đổi
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </>
                    ) : (
                        <>
                            <p>
                                Bạn có chắc xóa đồng hồ này?{" "}
                                <strong className="underline">
                                    {meterData.code_meter}
                                </strong>
                                ?
                            </p>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={onClose}>
                                    Hủy bỏ
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => onSubmit(meterData)}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

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
        </>
    );
};

export default UpdateDialog;
