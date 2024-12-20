import { CheckCheckIcon, Moon, Palette, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/shared/theme-provider";

export const ModeToggle = () => {
    const { setTheme, theme } = useTheme();

    // Hàm kiểm tra theme hiện tại và trả về icon check
    const isActive = (themeName: string) => theme === themeName;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="size-10 rounded-full p-0 bg-foreground hover:bg-muted text-background hover:text-muted-foreground border-0 outline-none"
                >
                    <Palette className="w-6 h-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[99998]">
                {/* Light mode */}
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <span>Sáng</span>
                    {isActive("light") && <Sun className="ml-2 h-4 w-4" />}
                </DropdownMenuItem>

                {/* Dark mode */}
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <span>Tối</span>
                    {isActive("dark") && <Moon className="ml-2 h-4 w-4" />}
                </DropdownMenuItem>

                {/* Custom mode */}
                <DropdownMenuItem onClick={() => setTheme("custom")}>
                    <span>Hệ thống</span>
                    {isActive("custom") && (
                        <CheckCheckIcon className="ml-2 h-4 w-4" />
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
