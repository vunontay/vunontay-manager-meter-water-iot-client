import { TMeter } from "@/types/type-meter";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

interface IMap {
    meterData: TMeter[];
}

const icon = L.icon({
    iconUrl: "/placeholder.png",
    iconSize: [38, 38],
});

const Map = ({ meterData }: IMap) => {
    const locations = meterData.map((item) => {
        return item.location;
    });

    return (
        <MapContainer
            center={[16.054257, 108.202164]}
            zoom={12}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=s0nV4mXqNeWcmbivg1Sf"
            />
            {locations.map((location, index) => {
                if (!location || !location.longitude || !location.latitude) {
                    return null; // Nếu không có tọa độ hợp lệ, bỏ qua vị trí này
                }

                const position: LatLngExpression = [
                    location.latitude,
                    location.longitude,
                ];

                return (
                    <Marker key={index} position={position} icon={icon}>
                        <Popup>
                            <div>
                                <h3 className="text-sm font-bold">
                                    Mã: {meterData[index].code_meter}
                                </h3>
                                <div className="text-sm">
                                    <strong> Người dùng: </strong>
                                    {meterData[index].user?.first_name} {""}
                                    {meterData[index].user?.last_name}
                                </div>
                                <p className="text-sm">
                                    <strong> Địa chỉ: </strong>
                                    {meterData[index].note
                                        ? `${meterData[index].note}, `
                                        : null}
                                    {meterData[index].location?.name}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
