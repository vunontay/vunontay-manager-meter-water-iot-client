import { API_URL } from "@/constants/route";

import { AxiosResponse } from "axios";
import axiosInstance from "@/services/axios";
import { TUserEditValues } from "@/validations/user";
import { TResponse } from "@/types/utils";
import { TUser } from "@/types/type-user";

class UserService {
    // API Get user
    async getUsers(): Promise<TResponse<TUser[]>> {
        const response: AxiosResponse<TResponse<TUser[]>> =
            await axiosInstance.get(`${API_URL.USER.INDEX}`);
        return response.data;
    }

    async updateUser(
        userId: string,
        userData: TUserEditValues
    ): Promise<TResponse<TUser>> {
        const response: AxiosResponse<TResponse<TUser>> =
            await axiosInstance.put(
                `${API_URL.USER.INDEX}/${userId}`,
                userData
            );
        return response.data;
    }

    async deleteUser(userId: string): Promise<TResponse<null>> {
        const response: AxiosResponse<TResponse<null>> =
            await axiosInstance.delete(`${API_URL.USER.INDEX}/${userId}`);
        return response.data;
    }

    async getUserById(userId: string): Promise<TResponse<TUser>> {
        const response: AxiosResponse<TResponse<TUser>> =
            await axiosInstance.get(`${API_URL.USER.INDEX}/${userId}`);
        return response.data;
    }

    async getUserByPhoneNumber(phoneNumber: string): Promise<TResponse<TUser>> {
        const response: AxiosResponse<TResponse<TUser>> =
            await axiosInstance.get(
                `${API_URL.USER.INDEX}${API_URL.USER.SEARCH}/${phoneNumber}`
            );
        return response.data;
    }
}

const userService = new UserService();
export default userService;
