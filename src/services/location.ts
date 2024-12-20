import { API_URL } from "@/constants/route";
import axiosInstance from "@/services/axios";
import { TLocation, TLocationSearch } from "@/types/type-location";
import { TResponse } from "@/types/utils";
import { TLocationAddValues } from "@/validations/location";
import { AxiosResponse } from "axios";

class LocationService {
    async getLocations(): Promise<TResponse<TLocation[]>> {
        const response: AxiosResponse<TResponse<TLocation[]>> =
            await axiosInstance.get(`${API_URL.LOCATION.INDEX}`);
        return response.data;
    }

    async searchLocation(queryString: string): Promise<TLocationSearch[]> {
        const response = await axiosInstance.get(
            `${import.meta.env.VITE_NOMINATIM_BASE_URL}${queryString}`
        );
        return response.data;
    }

    async addLocation(
        locationData: TLocationAddValues
    ): Promise<TResponse<TLocation>> {
        const response: AxiosResponse<TResponse<TLocation>> =
            await axiosInstance.post(`${API_URL.LOCATION.INDEX}`, locationData);

        return response.data;
    }

    async updateLocation(
        locationId: string,
        locationData: TLocationAddValues
    ): Promise<TResponse<TLocation>> {
        const response: AxiosResponse<TResponse<TLocation>> =
            await axiosInstance.put(
                `${API_URL.LOCATION.INDEX}/${locationId}`,
                locationData
            );

        return response.data;
    }
}

const locationService = new LocationService();
export default locationService;
