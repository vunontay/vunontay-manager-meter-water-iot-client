import { Button } from "@/components/ui/button";
import {
    EllipsisVertical,
    MapPinPlus,
    UserRoundPen,
    MapPinMinus,
    UserRoundMinus,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuActionsProps {
    onEdit: () => void;
    onDelete: () => void;
    onAddAddress: () => void;
    onDeleteAddress: () => void;
    onUpdateAddress: () => void;
    address: string;
}

export function DropdownMenuActions({
    onEdit,
    onDelete,
    onAddAddress,
    onDeleteAddress,
    onUpdateAddress,
    address,
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

                        <UserRoundPen />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <span>Xóa</span>
                        <UserRoundMinus />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <span>Địa chỉ</span>

                            <MapPinPlus />
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {!address ? (
                                <DropdownMenuItem onClick={onAddAddress}>
                                    <span>Thêm</span>
                                    <MapPinPlus />
                                </DropdownMenuItem>
                            ) : (
                                <>
                                    <DropdownMenuItem onClick={onUpdateAddress}>
                                        <span>Sửa</span>
                                        <MapPinPlus />
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={onDeleteAddress}>
                                        <span>Xóa</span> <MapPinMinus />
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
