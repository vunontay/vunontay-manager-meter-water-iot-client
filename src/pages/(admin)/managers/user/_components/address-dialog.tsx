import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressAddSchema, TAddressAddValues } from "@/validations/address";
import { useEffect } from "react";

interface IAddressDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: TAddressAddValues) => void;
    type: "add" | "edit" | "delete" | "";
    addressData: TAddressAddValues;
    userId: string;
}

export function AddressDialog({
    isOpen,
    onClose,
    onSubmit,
    type,
    addressData,
    userId,
}: IAddressDialogProps) {
    const form = useForm<TAddressAddValues>({
        resolver: zodResolver(addressAddSchema),
        defaultValues: addressData || {
            city: "",
            district: "",
            commune: "",
            note: "",
            more_info: "",
            user_id: userId || "",
        },
    });

    useEffect(() => {
        // Reset form whenever locationData changes
        form.reset(addressData);
    }, [addressData, form]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] overflow-y-auto hide-scrollbar">
                <DialogHeader>
                    <DialogTitle>
                        {type === "add"
                            ? "Thêm Địa Chỉ"
                            : type === "edit"
                            ? "Sửa Địa Chỉ"
                            : "Xóa Địa Chỉ"}
                    </DialogTitle>
                </DialogHeader>

                {type !== "delete" ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thành Phố</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập thành phố"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quận/Huyện</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập quận/huyện"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="commune"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phường/Xã</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập phường/xã"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ghi Chú</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập ghi chú (không bắt buộc)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="more_info"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thông Tin Thêm</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập thông tin thêm (không bắt buộc)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="user_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                placeholder="Nhập User ID"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                >
                                    Hủy bỏ
                                </Button>
                                <Button type="submit">
                                    {type === "add" ? "Thêm" : "Lưu Thay Đổi"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <div>
                        <p>Bạn có chắc muốn xóa địa chỉ này không?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={onClose}>
                                Hủy bỏ
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    console.log(
                                        "Delete confirmed for:",
                                        addressData
                                    );
                                    onSubmit(addressData);
                                }}
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
