/* eslint-disable react-hooks/rules-of-hooks */
import userService from "@/services/user";
import { TUser } from "@/types/type-user";
import { TResponse } from "@/types/utils";
import { TUserEditValues } from "@/validations/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUser() {
    const queryClient = useQueryClient();

    // ------------------------------------------------------GET ALL USERS----------------------------------------------------------------
    const getUsersQuery = useQuery<TResponse<TUser[]>, Error>({
        queryKey: ["users"], // Key for caching
        queryFn: () => userService.getUsers(), // API call function
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        select: (response) => {
            return {
                message: response.message,
                data: response.data,
            };
        },
    });

    // ------------------------------------------------------UPDATE USER----------------------------------------------------------------
    const editUserMutation = useMutation<
        TResponse<TUser>,
        Error,
        { userId: string; userData: TUserEditValues }
    >({
        mutationFn: ({ userId, userData }) =>
            userService.updateUser(userId, userData),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => toast.error(error.message),
    });

    // ------------------------------------------------------DELETE USER----------------------------------------------------------------
    const deleteUserMutation = useMutation<TResponse<null>, Error, string>({
        mutationFn: (userId: string) => userService.deleteUser(userId),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => toast.error(error.message),
    });

    // ------------------------------------------------------GET USER BY ID (Query)--------------------------------------------------------
    const getUserQuery = (userId?: string) =>
        useQuery<TResponse<TUser>, Error>({
            queryKey: ["user", userId],
            queryFn: () => userService.getUserById(userId!),
            enabled: !!userId,
            select: (response) => ({
                message: response.message,
                data: response.data,
            }),
            staleTime: 5 * 60 * 1000,
        });

    // ------------------------------------------GET USER BY PHONE NUMBER (Query)---------------------------------
    const getUserQueryByPhoneNumber = (phoneNumber: string) =>
        useQuery<TResponse<TUser>, Error>({
            queryKey: ["user", phoneNumber],
            queryFn: () => userService.getUserByPhoneNumber(phoneNumber!),
            enabled: !!phoneNumber,
            select: (response) => ({
                message: response.message,
                data: response.data,
            }),
            staleTime: 5 * 60 * 1000,
        });

    return {
        getUsersQuery,
        editUserMutation,
        deleteUserMutation,
        getUserQuery,
        getUserQueryByPhoneNumber,
    };
}
