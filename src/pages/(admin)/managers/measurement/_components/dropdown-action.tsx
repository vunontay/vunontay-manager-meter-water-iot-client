import { Button } from "@/components/ui/button";
import {
    EllipsisVertical,
    ListCollapse,
    RotateCcw,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuActionsProps {
    onViewDetail: () => void;
    onDelete: () => void;
    onReset: () => void;
}

export function DropdownMenuActions({
    onViewDetail,
    onDelete,
    onReset,
}: DropdownMenuActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <p className="text-sm font-bold leading-none py-2 text-center">
                        Thao tác
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onViewDetail}>
                        <span>Xem chi tiết</span>
                        <ListCollapse className="ml-2 h-4 w-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onReset}
                        className="text-yellow-600"
                    >
                        <span>Reset</span>
                        <RotateCcw className="ml-2 h-4 w-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onDelete}
                        className="text-red-600"
                    >
                        <span>Xóa</span>
                        <Trash2 className="ml-2 h-4 w-4" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
