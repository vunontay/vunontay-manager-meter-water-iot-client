import meterService from "@/services/meter";
import { TMeter } from "@/types/type-meter";
import { TResponse } from "@/types/utils";
import { TAssignMeterValues, TEditMeterValues } from "@/validations/meter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useMeter = () => {
    const queryClient = useQueryClient();
    // ------------------------------------------------------GET ALL METERS----------------------------------------------------------------
    const getMetersQuery = useQuery<TResponse<TMeter[]>, Error>({
        queryKey: ["meters"],
        queryFn: () => meterService.getMeters(),
        staleTime: 5 * 60 * 1000,
        select: (response) => {
            return {
                message: response.message,
                data: response.data,
            };
        },
    });

    const editMeterMutation = useMutation<
        TResponse<TMeter>,
        Error,
        { meterId: string; meterData: TEditMeterValues }
    >({
        mutationFn: ({ meterId, meterData }) =>
            meterService.updateMeter(meterId, meterData),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["meters"] });
        },
        onError: (error) => toast.error(error.message),
    });

    const assignMeterMutation = useMutation<
        TResponse<TMeter>,
        Error,
        TAssignMeterValues
    >({
        mutationFn: (meterData) => meterService.createMeter(meterData),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["meters"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const deleteMeterMutation = useMutation<TResponse<null>, Error, string>({
        mutationFn: (meterId: string) => meterService.deleteMeter(meterId),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["meters"] });
        },
        onError: (error) => toast.error(error.message),
    });

    return {
        assignMeterMutation,
        getMetersQuery,
        editMeterMutation,
        deleteMeterMutation,
    };
};

export default useMeter;
