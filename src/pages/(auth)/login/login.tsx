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
import { loginSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const LoginPage = () => {
    const { loginMutation } = useAuth();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        loginMutation.mutate(values);
    };

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
            <div className="w-full m-auto sm:max-w-lg px-4">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">
                            Đăng nhập
                        </CardTitle>
                        <CardDescription className="text-center">
                            Nhập thông tin của bạn để tiếp tục.
                        </CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Số điện thoại</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nhập Số điện thoại của bạn"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mật khẩu</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="Mật khẩu"
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
                                    isLoading={loginMutation.isPending}
                                >
                                    {loginMutation.isPending
                                        ? "Đang đăng nhập..."
                                        : "Đăng nhập"}
                                </LoadingButton>

                                <div className="flex items-center justify-between mt-4 w-full">
                                    <p className="text-sm text-center text-gray-700">
                                        Chưa có tài khoản?{" "}
                                        <Link
                                            to="/auth/register"
                                            className="text-primary hover:underline"
                                        >
                                            Đăng ký
                                        </Link>
                                    </p>

                                    <Link
                                        className="text-sm text-center text-primary hover:underline flex items-center gap-2 "
                                        to={"/"}
                                    >
                                        Về trang chủ <Home className="size-4" />
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

export default LoginPage;
