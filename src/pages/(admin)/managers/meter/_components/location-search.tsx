import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, MapPinIcon as MapPinPlus } from "lucide-react";
import useLocation from "@/hooks/location";
import { TLocationSearch } from "@/types/type-location";

const searchSchema = z.object({
    searchQuery: z.string().min(1, "Vui lòng nhập từ khóa tìm kiếm"),
});

interface LocationSearchProps {
    onSelectPosition: (position: TLocationSearch) => void;
}

const LocationSearch = ({ onSelectPosition }: LocationSearchProps) => {
    const [searchResults, setSearchResults] = useState<TLocationSearch[]>([]);
    const { searchLocationMutation } = useLocation();

    const form = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues: { searchQuery: "" },
    });

    const onSubmit = async (values: z.infer<typeof searchSchema>) => {
        const params = new URLSearchParams({
            q: values.searchQuery,
            format: "json",
            addressdetails: "1",
            polygon_geojson: "0",
            countrycodes: "VN",
        });

        try {
            const results = await searchLocationMutation.mutateAsync(
                params.toString()
            );
            setSearchResults(results);
        } catch (error) {
            console.error("Error searching locations:", error);
        }
    };

    return (
        <Command className="rounded-lg border shadow-md bg-white dark:bg-gray-800">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
                    <div className="flex items-center space-x-2">
                        <FormField
                            control={form.control}
                            name="searchQuery"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <Input
                                            placeholder="Tìm kiếm vị trí đặt đồng hồ..."
                                            {...field}
                                            className="w-full"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="sm" className="shrink-0">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Tìm kiếm</span>
                        </Button>
                    </div>
                </form>
            </Form>

            <CommandList className="max-h-[300px] overflow-y-auto">
                {searchLocationMutation.isPending ? (
                    <div className="flex items-center justify-center py-6">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        {searchLocationMutation.data?.length === 0 && (
                            <CommandEmpty className="py-6 text-center text-sm">
                                Không tìm thấy kết quả.
                            </CommandEmpty>
                        )}

                        <CommandGroup heading="Kết quả tìm kiếm">
                            {searchResults.map((result, index) => (
                                <CommandItem
                                    key={index}
                                    className="flex items-center space-x-2 py-2 cursor-pointer"
                                    onSelect={() => onSelectPosition(result)}
                                >
                                    <MapPinPlus className="h-5 w-5 text-primary shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {result.display_name}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {result.type},{" "}
                                            {result.address.country}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </Command>
    );
};

export default LocationSearch;
