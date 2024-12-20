import { API_URL } from "@/constants/route";
import { TAddress } from "@/types/type-address";
import { TResponse } from "@/types/utils";
import { TAddressAddValues } from "@/validations/address";
import { AxiosResponse } from "axios";
import axiosInstance from "@/services/axios";

class AddressService {
    async addAddress(
        addressData: TAddressAddValues
    ): Promise<TResponse<TAddress>> {
        const response: AxiosResponse<TResponse<TAddress>> =
            await axiosInstance.post(
                `${API_URL.ADDRESS.INDEX}${API_URL.ADDRESS.ADD}`,
                addressData
            );

        return response.data;
    }

    async updateAddress(
        userId: string,
        addressId: string,
        addressData: TAddressAddValues
    ): Promise<TResponse<TAddress>> {
        const response: AxiosResponse<TResponse<TAddress>> =
            await axiosInstance.put(
                `${API_URL.ADDRESS.INDEX}/${userId}/${addressId}`,
                addressData
            );

        return response.data;
    }

    async getAddress(userId: string): Promise<TResponse<TAddress>> {
        const response: AxiosResponse<TResponse<TAddress>> =
            await axiosInstance.get(`${API_URL.ADDRESS.INDEX}/${userId}`);

        return response.data;
    }

    async deleteAddress(
        userId: string,
        addressId: string
    ): Promise<TResponse<null>> {
        const response: AxiosResponse<TResponse<null>> =
            await axiosInstance.delete(
                `${API_URL.ADDRESS.INDEX}/${userId}/${addressId}`
            );

        return response.data;
    }
}

const addressService = new AddressService();
export default addressService;
