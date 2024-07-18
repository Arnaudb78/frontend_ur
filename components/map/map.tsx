"use client";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
    return (
        <>
            <MapContainer center={[48.8566, 2.3522]} zoom={15} className="rounded-2xl h-96 w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMarker center={[48.8566, 2.3522]} radius={50} color="transparent" fillColor="green" opacity={5}>
                    <Popup>
                        <p>WESHHHHH</p>
                    </Popup>
                </CircleMarker>
            </MapContainer>
        </>
    );
}
