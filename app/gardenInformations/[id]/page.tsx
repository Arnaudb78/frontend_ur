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
        const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/garden/get`, {
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
            const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/garden/check`, {
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
            alert("Utilisateur non connecté.");
            return;
        }

        const accessToken = JSON.parse(user).accessToken;
        if (!accessToken) {
            alert("Token d'accès manquant.");
            return;
        }

        try {
            const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/garden/join`, {
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
            alert("Utilisateur non connecté.");
            return;
        }

        const accessToken = JSON.parse(user).accessToken;
        if (!accessToken) {
            alert("Token d'accès manquant.");
            return;
        }
        try {
            const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/garden/leave`, {
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
            <section className="flex flex-col justify-center items-center gap-4 p-8 pt-24 bg-secondary-100 text-sm md:pt-28 sm:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 xl:pt-36 xl:p-20 md:text-lg lg:text-xl">
                <div onClick={handleBack} className="w-full flex items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                    <p>Revenir aux jardins</p>
                </div>
                <h2 className="text-2xl font-bold text-center md:text-2xl lg:text-3xl xl:text-4xl">
                    Les informations du jardin-potager de {owner?.firstname}
                </h2>
                <div className="w-full flex flex-col gap-4 lg:gap-6 xl:gap-10 2xl:gap-10 p-4 bg-white rounded-lg shadow-md text-sm md:text-lg lg:text-xl md:p-8 md:px-10">
                    <div className="flex flex-col gap-4 lg:flex-row xl:justify-evenly">
                        <div className="flex flex-col gap-4 lg:p-8">
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
                        </div>
                        <div className="flex flex-col gap-4 lg:p-8">
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
                                <p>Connectez-vous pour voir l&apos;adresse</p>
                            )}
                        </div>
                    </div>
                    { isConnected ? (
                        <div className="w-full flex justify-center items-center">
                        {isInGarden ? (
                            <button
                                onClick={() => handleLeaveGarden()}
                                className="w-full bg-red-600 text-secondary-200 p-2 rounded-lg font-bold cursor-pointer md:text-lg md:w-[60%] lg:text-xl xl:w-[40%] xl:text-2xl">
                                Quitter le jardin
                            </button>
                        ) : (
                            <button
                                onClick={joinGarden}
                                className="w-full bg-primary p-2 rounded-lg font-bold cursor-pointer md:text-lg md:w-[60%] lg:text-xl xl:w-[40%] xl:text-2xl">
                                Rejoindre le jardin
                            </button>
                        )}
                    </div>
                    ) : (
                        <div className="w-full flex justify-center items-center">
                            <p>Connectez-vous pour rejoindre le jardin.</p>
                        </div>
                    )}
                    
                </div>
            </section>
            <Footer />
        </Suspense>
    );
}
