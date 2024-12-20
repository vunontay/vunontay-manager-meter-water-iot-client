import { useState } from "react";
import { TUser } from "@/types/type-user";
import { useUser } from "@/hooks/user";
import { DropdownMenuActions } from "@/pages/(admin)/managers/user/_components/dropdown-action";
import { UserDialog } from "@/pages/(admin)/managers/user/_components/user-dialog";
import { TUserEditValues } from "@/validations/user";
import { TAddressAddValues } from "@/validations/address";
import { AddressDialog } from "@/pages/(admin)/managers/user/_components/address-dialog";
import { useAddress } from "@/hooks/address";

interface ICellAction {
    data: TUser;
}

export function CellAction({ data }: ICellAction) {
    const { editUserMutation, deleteUserMutation } = useUser();
    const { addAddressMutation, updateAddressMutation, deleteAddressMutation } =
        useAddress();

    const [userDialogState, setUserDialogState] = useState({
        open: false,
        type: "" as "edit" | "delete" | "",
    });
    const [addressDialogState, setAddressDialogState] = useState({
        open: false,
        type: "" as "add" | "edit" | "delete" | "",
    });

    const openUserDialog = (type: "edit" | "delete") => {
        setUserDialogState({ open: true, type });
    };

    const closeUserDialog = () => {
        setUserDialogState({ open: false, type: "" });
    };
    //
    const openAddressDialog = (type: "add" | "edit" | "delete") => {
        setAddressDialogState({ open: true, type });
    };

    const closeAddressDialog = () => {
        setAddressDialogState({ open: false, type: "" });
    };

    const onSubmitUser = (values: TUserEditValues) => {
        if (userDialogState.type === "edit") {
            editUserMutation.mutate({ userId: data._id, userData: values });
        } else if (userDialogState.type === "delete") {
            deleteUserMutation.mutate(data._id);
        }
        closeUserDialog();
    };

    const onSubmitAddress = (values: TAddressAddValues) => {
        if (addressDialogState.type === "add") {
            addAddressMutation.mutate(values);
        } else if (addressDialogState.type === "edit") {
            updateAddressMutation.mutate({
                userId: data?._id,
                addressId: data?.address._id,
                addressData: values,
            });
        } else if (addressDialogState.type === "delete") {
            deleteAddressMutation.mutate({
                userId: data?._id,
                addressId: data?.address._id,
            });
        }
        closeAddressDialog();
    };

    return (
        <div className="flex items-center gap-2">
            <DropdownMenuActions
                onEdit={() => openUserDialog("edit")}
                onDelete={() => openUserDialog("delete")}
                onAddAddress={() => openAddressDialog("add")}
                onDeleteAddress={() => openAddressDialog("delete")}
                onUpdateAddress={() => openAddressDialog("edit")}
                address={data?.address?._id}
            />
            <UserDialog
                isOpen={userDialogState.open}
                onClose={closeUserDialog}
                onSubmit={onSubmitUser}
                type={userDialogState.type}
                userData={{
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar,
                }}
            />
            <AddressDialog
                isOpen={addressDialogState.open}
                onClose={closeAddressDialog}
                onSubmit={onSubmitAddress}
                type={addressDialogState.type}
                addressData={data.address}
                userId={data?._id}
            />
        </div>
    );
}
