"use client";
import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Garden {
    _id: string;
    name: string;
    description: string;
    address: string;
    owner: string;
    members: string[];
    capacity: number;
}

interface Address {
    street: string;
    complementary: string;
    postCode: string;
    city: string;
    country: string;
    lat: number;
    lon: number;
}

const customIcon = L.icon({
    iconUrl: '/location-pin.png',
    iconSize: [38, 38],            
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});


export default function Map() {
    const router = useRouter();
    const [gardenLocations, setGardenLocations] = useState<{ garden: Garden, address: Address }[]>([]);

    const getGardens = async (): Promise<Garden[]> => {
        const response = await fetch("http://localhost:5001/garden");
        if (!response.ok) {
            console.error("Erreur de récupération des jardins");
            return [];
        }
        const data = await response.json();
        return data;
    };

    const getAddress = async (addressId: string): Promise<Address | null> => {
        try {
            const response = await fetch(`http://localhost:5001/address/${addressId}`);
            if (!response.ok) {
                console.error(`Erreur de récupération de l'adresse avec l'ID ${addressId}`);
                return null;
            }
            const addressData = await response.json();
            return addressData;
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'adresse: ${error}`);
            return null;
        }
    };

    const all = async () => {
        const gardenData = await getGardens();

        const gardenAddresses = await Promise.all(
            gardenData.map(async (garden) => {
                const address = await getAddress(garden.address);
                return { garden, address };
            })
        );

        const validGardenLocations = gardenAddresses.filter(
            (item) => item.address !== null
        ) as { garden: Garden, address: Address }[];

        setGardenLocations(validGardenLocations);
    };

    useEffect(() => {
        all();
    }, []);

    function handleClick(id: string) {
        router.push(`/gardenInformations/${id}`);
    }

    return (
        <>
            <MapContainer center={[48.8566, 2.3522]} zoom={5} className="rounded-2xl h-96 w-full" style={{ zIndex: 0 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                     {gardenLocations.map(({ garden, address }, index) => (
                    <Marker
                        key={index}
                        position={[address.lat, address.lon]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div>
                                <h2>{garden.name}</h2>
                                <p>{garden.description}</p>
                                <p>{address.street}, {address.city}</p>
                                <button onClick={() => handleClick(garden._id)} className="bg-primary p-2 rounded-lg font-bold cursor-pointer">Rejoindre le jardin</button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
}
