import { API_URL } from "@/constants/route";
import { TResponse } from "@/types/utils";
import { TAssignMeterValues, TEditMeterValues } from "@/validations/meter";
import { AxiosResponse } from "axios";
import axiosInstance from "@/services/axios";
import { TMeter } from "@/types/type-meter";

class MeterService {
    async createMeter(
        meterData: TAssignMeterValues
    ): Promise<TResponse<TMeter>> {
        const response: AxiosResponse<TResponse<TMeter>> =
            await axiosInstance.post(`${API_URL.METER.INDEX}`, meterData);
        return response.data;
    }

    async updateMeter(
        meterId: string,
        meterData: TEditMeterValues
    ): Promise<TResponse<TMeter>> {
        const response: AxiosResponse<TResponse<TMeter>> =
            await axiosInstance.put(
                `${API_URL.METER.INDEX}/${meterId}`,
                meterData
            );
        return response.data;
    }

    async getMeters(): Promise<TResponse<TMeter[]>> {
        const response: AxiosResponse<TResponse<TMeter[]>> =
            await axiosInstance.get(`${API_URL.METER.INDEX}`);
        return response.data;
    }

    async deleteMeter(meterId: string): Promise<TResponse<null>> {
        const response: AxiosResponse<TResponse<null>> =
            await axiosInstance.delete(`${API_URL.METER.INDEX}/${meterId}`);
        return response.data;
    }
}

const meterService = new MeterService();
export default meterService;
