import { API_URL } from "@/constants/route";
import axiosInstance from "@/services/axios";
import { TMeasurement, TMeasurementUser } from "@/types/type-measurement";
import { TResponse } from "@/types/utils";
import { AxiosResponse } from "axios";

class MeasurementService {
    async sendRequest(): Promise<TResponse<null>> {
        const response: AxiosResponse<TResponse<null>> =
            await axiosInstance.post(
                `${API_URL.MEASUREMENT.INDEX}${API_URL.MEASUREMENT.SETUP}`
            );
        return response.data;
    }

    async getMeasurements(): Promise<TResponse<TMeasurement[]>> {
        const response: AxiosResponse<TResponse<TMeasurement[]>> =
            await axiosInstance.get(`${API_URL.MEASUREMENT.INDEX}`);
        return response.data;
    }

    async getMeasurementById(
        meterId: string
    ): Promise<TResponse<TMeasurement[]>> {
        const response: AxiosResponse<TResponse<TMeasurement[]>> =
            await axiosInstance.get(`${API_URL.MEASUREMENT.INDEX}/${meterId}`);
        return response.data;
    }

    async getMeasurementByUserId(
        userId: string
    ): Promise<TResponse<TMeasurementUser>> {
        const response: AxiosResponse<TResponse<TMeasurementUser>> =
            await axiosInstance.get(
                `${API_URL.MEASUREMENT.INDEX}/user/${userId}`
            );
        return response.data;
    }
}

const measurementService = new MeasurementService();
export default measurementService;
