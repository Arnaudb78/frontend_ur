"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Garden {
    _id: string;
    name: string;
    description: string;
    address: string;
    owner: string;
    members: string[];
    capacity: number;
}

export default function Gardens() {
    const router = useRouter();
    const [gardens, setGardens] = useState<Garden[]>([]);

    const getGardens = async (): Promise<Garden[]> => {
        const response = await fetch("https://urban-roots-ada879145d2c.herokuapp.com/garden");
        if (!response.ok) {
            console.error("Erreur de récupération des jardins");
            return [];
        }
        const data = await response.json();
        return data;
    };

    const all = async () => {
        const gardenData = await getGardens();
        setGardens(gardenData);
    };

    useEffect(() => {
        all();
    }, []);

    useEffect(() => {}, [gardens]);

    function handleClick(id: string) {
        router.push(`/gardenInformations/${id}`);
    }

    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col justify-center items-center pt-24 gap-8 md:pt-28 xl:pt-36 xl:p-20">
                <h2 className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl">
                    Les jardins de la <span className="bg-secondary-300 text-secondary-100 inline-block rotate-3">communauté</span> !
                </h2>
                <div className="w-full flex flex-col gap-4 p-4 text-sm md:p-8 md:text-lg lg:text-xl lg:gap-8 xl:gap-12">
                    {gardens.map((garden) => (
                        <div key={garden._id} className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md lg:p-10 lg:gap-6">
                            <h2 className="font-bold">{garden.name}</h2>
                            <p>{garden.description}</p>
                            <div className="flex justify-between">
                                <p>
                                    Membres :{" "}
                                    <span className="font-bold">
                                        {Array.isArray(garden.members) ? garden.members.length : 0} / {garden.capacity}
                                    </span>
                                </p>
                                <button onClick={() => handleClick(garden._id)} className="bg-primary p-2 rounded-lg font-bold cursor-pointer">
                                    + de détails
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}
