import { API_URL } from "@/constants/route";
import { TAuth } from "@/types/type-auth";
import { TUser } from "@/types/type-user";
import { TResponse } from "@/types/utils";
import { TLoginValues, TRegisterValues } from "@/validations/auth";
import { AxiosResponse } from "axios";
import axiosInstance from "@/services/axios";

class AuthService {
    // API login
    async login(data: TLoginValues): Promise<TResponse<TAuth>> {
        const response: AxiosResponse<TResponse<TAuth>> =
            await axiosInstance.post(`${API_URL.AUTH.LOGIN}`, data);

        return response.data;
    }

    // API register
    async register(data: TRegisterValues): Promise<TResponse<TUser>> {
        const response: AxiosResponse<TResponse<TUser>> =
            await axiosInstance.post(`${API_URL.AUTH.REGISTER}`, data);

        return response.data;
    }

    async logout(): Promise<TResponse<null>> {
        const response: AxiosResponse<TResponse<null>> =
            await axiosInstance.post(`${API_URL.AUTH.LOGOUT}`);

        return response.data;
    }
}

// Export an instance of the class
const authService = new AuthService();
export default authService;
