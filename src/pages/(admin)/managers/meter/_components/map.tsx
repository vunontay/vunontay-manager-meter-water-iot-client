import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { TLocationSearch } from "@/types/type-location";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TLocationAddValues } from "@/validations/location";

const icon = L.icon({
    iconUrl: "/placeholder.png",
    iconSize: [38, 38],
});

interface IMap {
    selectedPosition: TLocationSearch | null;
    setIsMapDialogOpen: (isOpen: boolean) => void;
    onLocationConfirmed: (confirmed: TLocationAddValues) => void;
}

function ResetCenterView({
    selectedPosition,
}: {
    selectedPosition: TLocationSearch | null;
}) {
    const map = useMap();

    useEffect(() => {
        if (selectedPosition) {
            map.setView(
                L.latLng(
                    Number(selectedPosition?.lat),
                    Number(selectedPosition?.lon)
                ),
                map.getZoom(),
                {
                    animate: true,
                }
            );
        }
    }, [map, selectedPosition]);

    return null;
}

const Map = ({
    selectedPosition,
    setIsMapDialogOpen,
    onLocationConfirmed,
}: IMap) => {
    const locationSelection = selectedPosition
        ? [
              selectedPosition.lat,
              selectedPosition.lon,
              selectedPosition.display_name,
          ]
        : [16.0544, 108.2022];
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    const handleConfirm = () => {
        if (isChecked && selectedPosition) {
            onLocationConfirmed({
                name: selectedPosition?.display_name,
                latitude: Number(selectedPosition?.lat),
                longitude: Number(selectedPosition?.lon),
                note: selectedPosition?.osm_type,
            });

            setIsMapDialogOpen(false);
        }
    };

    return (
        <MapContainer
            center={locationSelection as LatLngExpression}
            zoom={8}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=s0nV4mXqNeWcmbivg1Sf"
            />
            {selectedPosition && (
                <Marker
                    position={locationSelection as LatLngExpression}
                    icon={icon}
                >
                    <Popup>
                        <h3 className="text-md font-bold">
                            {selectedPosition.name}
                        </h3>
                        <br />
                        Latitude: {selectedPosition.lat}
                        <br />
                        Longitude: {selectedPosition.lon}
                        <div className="flex items-center space-x-2  mt-2">
                            <Checkbox
                                id="select-location"
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                    handleCheckboxChange(checked as boolean)
                                }
                            />
                            <label
                                htmlFor="select-location"
                                className="text-sm font-medium leading-none"
                            >
                                Xác nhận vị trí này
                            </label>
                        </div>
                        <Button
                            onClick={handleConfirm}
                            size={"sm"}
                            className="mt-4 w-full"
                            disabled={!isChecked}
                        >
                            Xác nhận
                        </Button>
                    </Popup>
                </Marker>
            )}
            <ResetCenterView selectedPosition={selectedPosition} />
        </MapContainer>
    );
};

export default Map;
