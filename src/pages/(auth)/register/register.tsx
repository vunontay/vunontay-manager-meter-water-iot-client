import { LoadingButton } from "@/components/customs/button/loading-button";
import { PasswordInput } from "@/components/customs/form/password-input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth";
import { registerSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const RegisterPage = () => {
    const { registerMutation } = useAuth();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            // first_name: "",
            // last_name: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        registerMutation.mutate(values); // Gọi mutate từ registerMutation
    };

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto sm:max-w-lg px-4">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">
                            Tạo tài khoản
                        </CardTitle>
                        <CardDescription className="text-center">
                            Điền thông tin để đăng ký.
                        </CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="grid gap-6">
                                {/* Email */}
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
                                {/* Phone */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Số điện thoại</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nhập số điện thoại"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mật khẩu</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="Nhập mật khẩu"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="flex flex-col">
                                <LoadingButton
                                    className="w-full"
                                    type="submit"
                                    isLoading={registerMutation.isPending}
                                >
                                    {registerMutation.isPending
                                        ? "Đang gửi..."
                                        : "Đăng ký"}
                                </LoadingButton>
                                <div className="flex items-center justify-between mt-4 w-full">
                                    <p className="text-sm text-center text-gray-700">
                                        Đã có tài khoản?{" "}
                                        <Link
                                            to="/auth/login"
                                            className="text-primary hover:underline"
                                        >
                                            Đăng nhập
                                        </Link>
                                    </p>
                                    <Link
                                        to="/"
                                        className="text-sm text-center text-primary hover:underline flex items-center gap-2"
                                    >
                                        Trang chủ <Home className="size-4" />
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;
