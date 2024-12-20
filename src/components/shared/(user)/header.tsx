import { ModeToggle } from "@/components/shared/mode-toggle";
import { UserNav } from "@/components/shared/user-nav";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { RootState } from "@/stores/store";
import { Menu } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface RouteProps {
    href: string;
    label: string;
}

interface FeatureProps {
    title: string;
    description: string;
}

const routeList: RouteProps[] = [
    {
        href: "/",
        label: "Trang chủ",
    },

    {
        href: "user/contacts",
        label: "Liên hệ",
    },
];

const featureList: FeatureProps[] = [
    {
        title: "Bảo trì thiết bị",
        description:
            "Đảm bảo đồng hồ IoT nước hoạt động ổn định thông qua các dịch vụ bảo trì định kỳ và sửa chữa chuyên nghiệp.",
    },
    {
        title: "Sửa chữa thiết bị",
        description:
            "Nhanh chóng phát hiện và khắc phục sự cố đồng hồ nước để duy trì hiệu suất đo lường chính xác.",
    },
    {
        title: "Cài đặt và lắp đặt",
        description:
            "Hỗ trợ cài đặt và tích hợp đồng hồ nước IoT dễ dàng vào hệ thống hiện có của bạn, đảm bảo hoạt động mượt mà.",
    },
];

const Header = () => {
    const userId = useSelector((state: RootState) => state?.auth?._id);
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
            <Link to="/">
                <img
                    alt="logo"
                    src="/logo.webp"
                    className={
                        "transition-all duration-300 ease-in-out size-10"
                    }
                />
            </Link>
            {/* <!-- Mobile --> */}
            <div className="flex items-center lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Menu
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer lg:hidden"
                        />
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
                    >
                        <div>
                            <SheetHeader className="mb-4 ml-4">
                                <SheetTitle className="flex items-center">
                                    <Link to="/">
                                        <img
                                            alt="logo"
                                            src="/logo.webp"
                                            className={
                                                "transition-all duration-300 ease-in-out size-10"
                                            }
                                        />
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-2">
                                {routeList.map(({ href, label }) => (
                                    <Button
                                        key={href}
                                        onClick={() => setIsOpen(false)}
                                        asChild
                                        variant="ghost"
                                        className="justify-start text-base"
                                    >
                                        <Link to={href}>{label}</Link>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <SheetFooter className="flex-col sm:flex-col justify-start items-start">
                            <ModeToggle />
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {/* <!-- Desktop --> */}
            <NavigationMenu className="hidden lg:block mx-auto">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        {routeList.map(({ href, label }) => (
                            <NavigationMenuLink key={href} asChild>
                                <Link
                                    to={href}
                                    className="text-sm font-medium px-2"
                                >
                                    {label}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-card text-sm">
                            Dịch vụ
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                                <img
                                    src="/service.webp"
                                    alt="RadixLogo"
                                    className="h-full w-full rounded-md object-cover"
                                    width={600}
                                    height={600}
                                />
                                <ul className="flex flex-col gap-2">
                                    {featureList.map(
                                        ({ title, description }) => (
                                            <li
                                                key={title}
                                                className="rounded-md p-3 text-sm hover:bg-muted"
                                            >
                                                <p className="mb-1 font-semibold leading-none text-foreground">
                                                    {title}
                                                </p>
                                                <p className="line-clamp-2 text-muted-foreground">
                                                    {description}
                                                </p>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden lg:flex gap-2">
                {userId ? (
                    <UserNav />
                ) : (
                    <Button variant={"outline"} size={"sm"} asChild>
                        <Link to={"/auth/login"}> Đăng nhập</Link>
                    </Button>
                )}

                <ModeToggle />
            </div>
        </header>
    );
};
export default Header;
