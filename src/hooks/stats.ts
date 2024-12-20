import statsService from "@/services/stats";
import { TStatsMonthlyConsumption } from "@/types/type-stats";
import { TResponse } from "@/types/utils";
import { useQuery } from "@tanstack/react-query";

const useStats = () => {
    const getStatsQuery = useQuery<
        TResponse<TStatsMonthlyConsumption[]>,
        Error
    >({
        queryKey: ["stats"],
        queryFn: () => statsService.getMonthlyConsumption(),
        staleTime: 5 * 60 * 1000,
        select: (response) => {
            return {
                message: response.message,
                data: response.data,
            };
        },
    });
    return { getStatsQuery };
};

export default useStats;
