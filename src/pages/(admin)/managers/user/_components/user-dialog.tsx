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
import { z } from "zod";
import { userEditSchema } from "@/validations/user";

interface UserDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: z.infer<typeof userEditSchema>) => void;
    type: "edit" | "delete" | "";
    userData: {
        email: string;
        first_name: string;
        last_name: string;
        avatar: string;
    };
}

export function UserDialog({
    isOpen,
    onClose,
    onSubmit,
    type,
    userData,
}: UserDialogProps) {
    const form = useForm<z.infer<typeof userEditSchema>>({
        resolver: zodResolver(userEditSchema),
        defaultValues: userData,
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[80vh] overflow-y-auto hide-scrollbar">
                <DialogHeader>
                    <DialogTitle>
                        {type === "edit" ? "Sửa thông tin" : "Xóa tài khoản"}
                    </DialogTitle>
                </DialogHeader>
                {type === "edit" ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập email của bạn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Họ</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập họ của bạn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập tên của bạn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ảnh đại diện</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập đường dẫn ảnh"
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
                                <Button type="submit">Lưu thay đổi</Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <div>
                        <p>
                            Bạn có chắc xóa tài khoản này{" "}
                            <strong className="underline">
                                {userData.email}
                            </strong>
                            ?
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={onClose}>
                                Hủy bỏ
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => onSubmit(userData)}
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
