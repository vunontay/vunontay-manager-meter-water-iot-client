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

    const getOneMeasurementMutation = useMutation<
        TResponse<null>,
        Error,
        string
    >({
        mutationFn: (code_meter: string) =>
            measurementService.getOneMeasurement(code_meter),
        onSuccess: async (data) => {
            toast.success(data.message);

            // Đợi 5 giây để MQTT lưu dữ liệu vào DB
            setTimeout(async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["measurements"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["measurement"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["invoices"],
                });
                await getMeasurementsQuery.refetch();
            }, 5000);
        },
        onError: (error) => toast.error(error.message),
    });

    const updateMeasurementMutation = useMutation<TResponse<null>, Error>({
        mutationFn: () => measurementService.sendRequest(),
        onSuccess: async (data) => {
            toast.success(data.message);

            // Đợi 5 giây để MQTT lưu dữ liệu vào DB
            setTimeout(async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["measurements"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["measurement"],
                });
                await queryClient.invalidateQueries({
                    queryKey: ["invoices"],
                });
                await getMeasurementsQuery.refetch();
            }, 5000);
        },
        onError: (error) => toast.error(error.message),
    });

    const resetMeasurementMutation = useMutation<
        TResponse<null>,
        Error,
        string
    >({
        mutationFn: (code_meter: string) =>
            measurementService.resetMeasurement(code_meter),
        onSuccess: async (data) => {
            toast.success(data.message);

            // Invalidate queries
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ["measurements"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["measurement"],
                });
            }, 3000);

            await getMeasurementsQuery.refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    return {
        getMeasurementsQuery,
        getMeasurementQuery,
        updateMeasurementMutation,
        getMeasurementUserQuery,
        getOneMeasurementMutation,
        resetMeasurementMutation,
    };
};

export default useMeasurement;
