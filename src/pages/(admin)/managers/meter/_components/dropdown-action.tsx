import { Button } from "@/components/ui/button";
import { EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";
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
    onEdit: () => void;
    onDelete: () => void;
}

export function DropdownMenuActions({
    onEdit,
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
                    <DropdownMenuItem onClick={onEdit}>
                        <span>Cập nhật</span>

                        <FilePenLine />
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
