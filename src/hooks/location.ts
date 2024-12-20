import locationService from "@/services/location";
import { TLocation, TLocationSearch } from "@/types/type-location";
import { TResponse } from "@/types/utils";
import { TLocationAddValues } from "@/validations/location";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useLocation = () => {
    const queryClient = useQueryClient();
    const searchLocationMutation = useMutation<
        TLocationSearch[],
        Error,
        string
    >({
        mutationFn: (queryString) =>
            locationService.searchLocation(queryString),

        onError: (error) => {
            toast.error(error.message);
        },
    });

    const addLocationMutation = useMutation<
        TResponse<TLocation>,
        Error,
        TLocationAddValues
    >({
        mutationFn: (locationData: TLocationAddValues) =>
            locationService.addLocation(locationData),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const getLocationsQuery = useQuery<TResponse<TLocation[]>, Error>({
        queryKey: ["locations"], // Key for caching
        queryFn: () => locationService.getLocations(), // API call function
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        select: (response) => {
            return {
                message: response.message,
                data: response.data,
            };
        },
    });

    const editLocationMutation = useMutation<
        TResponse<TLocation>,
        Error,
        { locationId: string; locationData: TLocationAddValues }
    >({
        mutationFn: ({ locationId, locationData }) =>
            locationService.updateLocation(locationId, locationData),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["locations"] });
        },
        onError: (error) => toast.error(error.message),
    });

    return {
        searchLocationMutation,
        searchResults: searchLocationMutation.data,
        addLocationMutation,
        getLocationsQuery,
        editLocationMutation,
    };
};

export default useLocation;
