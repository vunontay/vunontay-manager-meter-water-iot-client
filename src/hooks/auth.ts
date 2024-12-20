import { useMutation } from "@tanstack/react-query";
import { TLoginValues, TRegisterValues } from "@/validations/auth";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout, setTokens } from "@/stores/slices/auth";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "@/constants/route";
import { TResponse } from "@/types/utils";
import { TUser } from "@/types/type-user";
import { TAuth } from "@/types/type-auth";
import authService from "@/services/auth";

export function useAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginMutation = useMutation<TResponse<TAuth>, Error, TLoginValues>({
        mutationFn: (credentials: TLoginValues) =>
            authService.login(credentials),
        onSuccess: (data) => {
            toast.success(data.message);
            dispatch(
                setTokens({
                    accessToken: data.data.tokens.accessToken,
                    refreshToken: data.data.tokens.refreshToken,
                    role: data.data.role,
                    _id: data.data._id,
                })
            );
            if (data.data.role === "admin") {
                navigate(`${ROUTE_URL.ADMIN.INDEX}`);
            } else {
                navigate(`${ROUTE_URL.USER.INDEX}/${ROUTE_URL.USER.HOME}`);
            }
        },
        onError: (error) => toast.error(error.message),
    });

    // REGISTER ------------------------------------------------------------------------------------

    const registerMutation = useMutation<
        TResponse<TUser>,
        Error,
        TRegisterValues
    >({
        mutationFn: (credentials: TRegisterValues) =>
            authService.register(credentials),
        onSuccess: (data) => {
            toast.success(data.message);
            navigate(`${ROUTE_URL.AUTH.INDEX}/${ROUTE_URL.AUTH.LOGIN}`);
        },
        onError: (error) => toast.error(error.message),
    });

    // LOGOUT ------------------------------------------------------------------------------------
    const logoutMutation = useMutation<TResponse<null>, Error>({
        mutationFn: () => authService.logout(),
        onSuccess: (data) => {
            toast.success(data.message);
            dispatch(logout());
            navigate(`${ROUTE_URL.AUTH.INDEX}/${ROUTE_URL.AUTH.LOGIN}`);
        },
        onError: (error) => toast.error(error.message),
    });

    return {
        registerMutation,
        loginMutation,
        logoutMutation,
    };
}
