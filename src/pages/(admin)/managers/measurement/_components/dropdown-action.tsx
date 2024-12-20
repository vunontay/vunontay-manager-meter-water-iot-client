import { Button } from "@/components/ui/button";
import { EllipsisVertical, ListCollapse, Trash2 } from "lucide-react";
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
}

export function DropdownMenuActions({
    onViewDetail,
    onDelete,
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

                        <ListCollapse />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <span>Xóa</span>
                        <Trash2 />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
