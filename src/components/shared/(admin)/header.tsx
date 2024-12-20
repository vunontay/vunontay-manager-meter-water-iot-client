import { useSelector, useDispatch } from "react-redux";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { UserNav } from "@/components/shared/user-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { RootState } from "@/stores/store";
import { invokeToggleCollapse } from "@/stores/slices/sidebar";

export const Header = () => {
    const dispatch = useDispatch();

    // Lấy trạng thái toggleCollapse từ Redux
    const toggleCollapse = useSelector(
        (state: RootState) => state.sidebar.toggleCollapse
    );

    // Hàm xử lý bật/tắt sidebar
    const handleSideBarToggle = () => {
        dispatch(invokeToggleCollapse());
    };

    return (
        <header
            className={cn(
                "fixed w-full z-[1000] px-4 shadow-sm transition-all duration-300",
                "bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] ",
                toggleCollapse ? "sm:pl-[18rem]" : "sm:pl-[5.6rem]"
            )}
        >
            <div className="flex items-center justify-between h-16">
                <Button
                    onClick={handleSideBarToggle}
                    size={"icon"}
                    variant={"outline"}
                    className="order-2 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] h-[30px] flex items-center justify-center transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
                >
                    <Menu />
                </Button>
                <div className="flex items-center justify-between sm:order-2 order-1">
                    <div className="p-2">
                        <ModeToggle />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center text-center">
                        <UserNav />
                    </div>
                </div>
            </div>
        </header>
    );
};
