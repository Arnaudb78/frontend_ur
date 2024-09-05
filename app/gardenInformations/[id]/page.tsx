"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

interface User {
    _id: string;
    firstname: string;
    lastname: string;
    mail: string;
}

export default function GuidePage() {
    const router = useRouter();
    const { id } = useParams();
    const [garden, setGarden] = useState<Garden | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [owner, setOwner] = useState<User | null>(null);
    const [count, setCount] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isInGarden, setIsInGarden] = useState(false);

    function handleBack() {
        router.back();
    }

    function handleConnect() {
        if (sessionStorage.getItem("user")) {
            setIsConnected(true);
        }
    }

    const getData = async () => {
        const response = await fetch(`http://localhost:5001/garden/get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });
        if (!response.ok) {
            console.error("Erreur de récupération des jardins");
            return {};
        }
        const data = await response.json();
        setGarden(data.garden);
        setAddress(data.address);
        setOwner(data.owner);
        setCount(data.count);
    };

    const checkIfUserIsInGarden = async () => {
        const user = sessionStorage.getItem("user");
        if (!user) {
            return;
        }

        const accessToken = JSON.parse(user).accessToken;
        if (!accessToken) {
            return;
        }

        if (!garden?._id) return;

        try {
            const response = await fetch(`http://localhost:5001/garden/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken: accessToken, id: garden._id }),
            });

            if (response.status === 400) {
                alert("Token invalide, veuillez vous reconnecter.");
                router.push("/connect");
                return;
            }
            if (response.status === 404) {
                return;
            }

            const data = await response.json();

            if (response.status === 200) {
                setIsInGarden(data.isOnTheGarden);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des jardins:", error);
            setIsInGarden(false);
        }
    };

    useEffect(() => {
        handleConnect();
        getData();
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (garden && isMounted) {
            checkIfUserIsInGarden();
        }
    }, [garden, isMounted]);

    const joinGarden = async () => {
        const user = sessionStorage.getItem("user");
        if (!user) {
            router.push(`/connect`);
        }

        const accessToken = JSON.parse(user).accessToken;
        if (!accessToken) {
            router.push(`/connect`);
        }
        try {
            const response = await fetch(`http://localhost:5001/garden/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken: accessToken, id: garden?._id }),
            });

            const data = await response.json();
            if (response.status === 400) {
                alert("Token invalide, veuillez vous reconnecter.");
                router.push("/connect");
                return;
            }
            if (response.status === 404) {
                alert("Jardin introuvable.");
                return;
            }

            if (response.status === 405) {
                alert(`Le jardin de ${owner?.firstname} est complet.`);
                return;
            }
            alert(`Félicitations, vous avez rejoint le jardin de ${owner?.firstname} !`);
            setCount(data.count);
            setIsInGarden(true);
        } catch (error) {
            console.error("Erreur lors de la récupération des jardins:", error);
        }
    };

    if (!isMounted) {
        return null;
    }

    const handleLeaveGarden = async () => {
        const user = sessionStorage.getItem("user");
        if (!user) {
            router.push(`/connect`);
        }

        const accessToken = JSON.parse(user).accessToken;
        if (!accessToken) {
            router.push(`/connect`);
        }
        try {
            const response = await fetch(`http://localhost:5001/garden/leave`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken: accessToken, id: garden?._id }),
            });

            const data = await response.json();
            setCount(data.count);
            setIsInGarden(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des jardins:", error);
        }
    };

    return (
        <Suspense>
            <Navbar />
            <section className="flex flex-col justify-center items-center gap-4 p-8 pt-24 bg-secondary-100 text-sm">
                <div onClick={handleBack} className="w-full flex items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                    <p>Revenir aux jardins</p>
                </div>
                <h2 className="text-2xl font-bold text-center">Les informations du jardin-potager de {owner?.firstname}</h2>
                <div className="w-full flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold">{garden?.name}</h3>
                    <p>{garden?.description}</p>
                    <p>
                        Membres :{" "}
                        <span className="font-bold">
                            {count} / {garden?.capacity}
                        </span>
                    </p>

                    <p>
                        Propriétaire : {owner?.firstname} {owner?.lastname}
                    </p>
                    <p className="font-bold">Adresse du jardin-potager :</p>
                    {isConnected ? (
                        <ul className="flex flex-col gap-2">
                            <li>{address?.street}</li>
                            {address?.complementary && <li>{address?.complementary}</li>}
                            <li>
                                {address?.postCode} {address?.city}
                            </li>
                            <li>{address?.country}</li>
                        </ul>
                    ) : (
                        <p>Connectez-vous pour voir l'adresse</p>
                    )}
                    {isInGarden ? (
                        <button onClick={() => handleLeaveGarden()} className="bg-red-600 text-secondary-200 p-2 rounded-lg font-bold cursor-pointer">
                            Quitter le jardin
                        </button>
                    ) : (
                        <button onClick={joinGarden} className="bg-primary p-2 rounded-lg font-bold cursor-pointer">
                            Rejoindre le jardin
                        </button>
                    )}
                </div>
            </section>
            <Footer />
        </Suspense>
    );
}
