import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/hooks/user";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UserNav = () => {
    const { logoutMutation } = useAuth();
    const { getUserQuery } = useUser();
    const userId = useSelector((state: RootState) => state?.auth?._id);
    const user = getUserQuery(userId as string);

    const handleLogout = () => {
        logoutMutation.mutate();
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="border-2 shadow-md cursor-pointer">
                        <AvatarImage src={user?.data?.data.avatar} alt="" />
                        <AvatarFallback>SR</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-[99998]">
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {user.data?.data?.first_name}{" "}
                                {user.data?.data?.last_name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.data?.data.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Hồ sơ
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        {user.data?.data.role === "user" && (
                            <DropdownMenuItem>
                                <Link to={"/user/measurements"}>
                                    Xem tiêu thụ
                                </Link>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        Đăng xuất
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
