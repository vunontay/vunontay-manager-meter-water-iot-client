import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMeter from "@/hooks/meter";
import { useDebounce } from "@/hooks/use-debounce";
import { useUser } from "@/hooks/user";
import { TLocation } from "@/types/type-location";
import { meterSchema, TAssignMeterValues } from "@/validations/meter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface MeterFormProps {
    locationConfirmed: TLocation | undefined;
    handleReset: () => void;
}

const MeterForm = ({ locationConfirmed, handleReset }: MeterFormProps) => {
    const [queryPhone, setQueryPhone] = useState<string>("");
    const { getUserQueryByPhoneNumber } = useUser();
    const { assignMeterMutation } = useMeter();
    const debouncedSearchTerm = useDebounce(queryPhone, 1000);

    // Fetch user data based on the debounced phone number search term
    const { data, isLoading, isError, error } =
        getUserQueryByPhoneNumber(debouncedSearchTerm);

    const form = useForm<z.infer<typeof meterSchema>>({
        resolver: zodResolver(meterSchema),
        defaultValues: {
            code_meter: "",
            location_id: locationConfirmed?._id || "",
            status: "active", // Default status
            user_id: data?.data._id || "", // Default user_id
        },
    });

    // Reset the form whenever locationConfirmed changes
    useEffect(() => {
        // Check if locationConfirmed is available and reset form with new data
        form.reset({
            code_meter: "",
            location_id: locationConfirmed?._id || "",
            status: "active",
            user_id: data?.data._id || "",
        });
    }, [locationConfirmed, data, form]);

    const onSubmit = async (values: TAssignMeterValues) => {
        assignMeterMutation.mutate(values, {
            onSuccess: () => {
                handleReset();
            },
            onError: (error) => {
                console.error("Lỗi khi tạo đồng hồ:", error);
            },
        });
    };

    return (
        <>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Tìm kiếm người dùng</Label>
                    <Input
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => setQueryPhone(e.target.value)}
                        value={queryPhone}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Display loading state */}
                {isLoading && (
                    <div className="text-gray-500 mt-2">Đang tìm kiếm...</div>
                )}

                {/* Display error state */}
                {isError && (
                    <div className="text-red-500 mt-2">
                        Lỗi: {error?.message || "Không thể tìm thấy người dùng"}
                    </div>
                )}

                {/* Display user details when found */}
                {data?.data && (
                    <div className="p-4 border-2 border-gray-200 rounded-lg">
                        <div className="mb-4">
                            <strong className="text-md">Họ và tên:</strong>{" "}
                            <span className="text-sm">
                                {data.data.first_name} {data.data.last_name}
                            </span>
                        </div>
                        <div>
                            <strong className="text-md">Số điện thoại:</strong>{" "}
                            <span className="text-sm">{data.data.phone}</span>
                        </div>
                    </div>
                )}
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="code_meter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mã đồng hồ</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nhập mã đồng hồ"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {assignMeterMutation.isPending
                            ? "Đang tạo"
                            : "Tạo đồng hồ"}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default MeterForm;
