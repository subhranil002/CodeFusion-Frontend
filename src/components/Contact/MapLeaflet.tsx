import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { fixLeafletIcon } from "../../utils/leafletIconFix";

function MapLeaflet() {
    useEffect(() => {
        fixLeafletIcon();
    }, []);

    return (
        <MapContainer
            center={[22.5726, 88.3639]}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
    );
}

export default MapLeaflet;
