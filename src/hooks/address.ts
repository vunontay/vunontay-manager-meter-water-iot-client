import addressService from "@/services/address";
import { TAddress } from "@/types/type-address";
import { TResponse } from "@/types/utils";
import { TAddressAddValues } from "@/validations/address";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddress() {
    const queryClient = useQueryClient();

    // ------------------------------------------------------ADD ADDRESS-----------------------------------------------------
    const addAddressMutation = useMutation<
        TResponse<TAddress>,
        Error,
        TAddressAddValues
    >({
        mutationFn: (addressData) => addressService.addAddress(addressData),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => toast.error(error.message),
    });

    // ------------------------------------------------------UPDATE ADDRESS-----------------------------------------------------

    const updateAddressMutation = useMutation<
        TResponse<TAddress>,
        Error,
        { userId: string; addressId: string; addressData: TAddressAddValues }
    >({
        mutationFn: ({ userId, addressId, addressData }) =>
            addressService.updateAddress(userId, addressId, addressData),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => toast.error(error.message),
    });

    // ------------------------------------------------------DELETE ADDRESS-----------------------------------------------------
    const deleteAddressMutation = useMutation<
        TResponse<null>,
        Error,
        { userId: string; addressId: string }
    >({
        mutationFn: ({ userId, addressId }) =>
            addressService.deleteAddress(userId, addressId),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => toast.error(error.message),
    });

    // ------------------------------------------------------GET ADDRESS-----------------------------------------------------

    const getAddressQuery = (userId: string) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery<TResponse<TAddress>, Error>({
            queryKey: ["address", userId],
            queryFn: () => addressService.getAddress(userId!),
            enabled: !!userId,
            select: (response) => ({
                message: response.message,
                data: response.data,
            }),
            staleTime: Infinity,
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
        });

    return {
        getAddressQuery,
        addAddressMutation,
        updateAddressMutation,
        deleteAddressMutation,
    };
}
