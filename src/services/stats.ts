import { API_URL } from "@/constants/route";
import axiosInstance from "@/services/axios";
import { TStatsMonthlyConsumption } from "@/types/type-stats";
import { TResponse } from "@/types/utils";
import { AxiosResponse } from "axios";

class StatsService {
    async getMonthlyConsumption(): Promise<
        TResponse<TStatsMonthlyConsumption[]>
    > {
        const response: AxiosResponse<TResponse<TStatsMonthlyConsumption[]>> =
            await axiosInstance.get(
                `${API_URL.STATS.INDEX}${API_URL.STATS.MONTHLY}`
            );
        return response.data;
    }
}

const statsService = new StatsService();
export default statsService;
