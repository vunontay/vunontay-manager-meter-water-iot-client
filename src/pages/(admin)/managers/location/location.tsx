import useMeter from "@/hooks/meter";
import Map from "@/pages/(admin)/managers/location/_components/map";
import { MapPin } from "lucide-react";

const UserLocationPage = () => {
    const { getMetersQuery } = useMeter();

    return (
        <div className="pt-6 pr-6 space-y-6">
            <h1 className="text-2xl font-bold tracking-tight my-4 flex items-center gap-2">
                <MapPin className="size-6" /> Quản lý vị trí lắp đặt
            </h1>

            <div className="relative h-[80vh] rounded-lg overflow-hidden">
                {" "}
                <Map meterData={getMetersQuery.data?.data || []} />
            </div>
        </div>
    );
};

export default UserLocationPage;
