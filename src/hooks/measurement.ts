import measurementService from "@/services/measurement";
import { TMeasurement, TMeasurementUser } from "@/types/type-measurement";
import { TResponse } from "@/types/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useMeasurement = () => {
    const queryClient = useQueryClient();

    // ------------------------------------------------------GET ALL MEASUREMENTS-----------------------------------------------
    const getMeasurementsQuery = useQuery<TResponse<TMeasurement[]>, Error>({
        queryKey: ["measurements"],
        queryFn: () => measurementService.getMeasurements(),
        staleTime: 5 * 60 * 1000,
        select: (response) => {
            return {
                message: response.message,
                data: response.data,
            };
        },
    });

    // ------------------------------------------------------GET MEASUREMENT BY ID (Query)--------------------------------------------------------
    const getMeasurementQuery = (meterId?: string) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery<TResponse<TMeasurement[]>, Error>({
            queryKey: ["measurement", meterId],
            queryFn: () => measurementService.getMeasurementById(meterId!),
            enabled: !!meterId,
            select: (response) => ({
                message: response.message,
                data: response.data,
            }),
            staleTime: 5 * 60 * 1000,
        });

    // ------------------------------------------------------GET MEASUREMENT BY USER ID (Query)--------------------------------------------------------
    const getMeasurementUserQuery = (userId?: string) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery<TResponse<TMeasurementUser>, Error>({
            queryKey: ["measurement", userId],
            queryFn: () => measurementService.getMeasurementByUserId(userId!),
            enabled: !!userId,
            select: (response) => ({
                message: response.message,
                data: response.data,
            }),
            staleTime: 5 * 60 * 1000,
        });

    const updateMeasurementMutation = useMutation<TResponse<null>, Error>({
        mutationFn: () => measurementService.sendRequest(),
        onSuccess: async (data) => {
            toast.success(data.message);

            // Invalidate the queries
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ["measurements"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["measurement"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["invoices"],
                });
            }, 1000);

            // After invalidation, refetch the data
            await getMeasurementsQuery.refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    return {
        getMeasurementsQuery,
        getMeasurementQuery,
        updateMeasurementMutation,
        getMeasurementUserQuery,
    };
};

export default useMeasurement;
