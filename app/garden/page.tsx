"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export default function Garden() {
    const router = useRouter();
    const [gardens, setGardens] = useState<Garden[]>([]);
    const [message, setMessage] = useState<string>("");
    const [span, setSpan] = useState<string>("");
    const [endMessage, setEndMessage] = useState<string>("");

    function handleBack() {
        router.back();
    }

    const findGardens = async () => {
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
            const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/garden/${accessToken}`);
            const gardens = await response.json();

            if (response.status === 400) {
                alert("Token invalide, veuillez vous reconnecter.");
                router.push("/login");
                return;
            }
            if (response.status === 404) {
                setMessage("Pas encore de ");
                setSpan("jardin");
                setEndMessage("? Créez-en un dès maintenant !");
                return;
            }

            setGardens(gardens);
        } catch (error) {
            console.error("Erreur lors de la récupération des jardins:", error);
        }
    }

    useEffect(() => {
        findGardens();
    }, []);

    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col pt-24 gap-8">
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon onClick={handleBack} icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                    <h1>Mes jardins</h1>
                </div>
                {gardens.length > 0 ? (
                    gardens.map((garden) => (
                        <div key={garden._id} className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
                            <h2 className="font-bold">{garden.name}</h2>
                            <p>{garden.description}</p>
                            <p>Membres : <span className="font-bold">{Array.isArray(garden.members) ? garden.members.length : 0} / {garden.capacity}</span></p>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-full flex flex-col gap-8 p-4 text-center">
                    <h2 className="text-xl font-bold">
                        {message} <span className="bg-secondary-300 px-1 text-secondary-100 inline-block rotate-3">{span}</span>{endMessage}
                    </h2>
                    <a href="/createGarden" className="bg-primary px-4 py-3 font-bold rounded-2xl hover:bg-green-800 hover:text-secondary-200">
                        Ajouter mon jardin
                    </a>
                </div>
                )}
            </section>
            <Footer />
        </>
    );
}