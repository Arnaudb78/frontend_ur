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

interface User {
    _id: string;
    firstname: string;
    lastname: string;
    mail: string;
    rules: string;
    isNewsletter: boolean;
    role: string;
}

interface Address {
    street: string;
    complementary: string;
    postCode: string;
    city: string;
    country: string;
}

export default function Gardens(){
    const router = useRouter();
    const [gardens, setGardens] = useState<Garden[]>([]);
    const [gardenUserPairs, setGardenUserPairs] = useState<{ garden: Garden; user: User }[]>([]);

    const getGardens = async (): Promise<Garden[]> => {
        const data = await fetch("http://localhost:5001/garden");
        const response = await data.json();
        return response;
    };

    const getUser = async (id: string): Promise<User> => {
        const data = await fetch(`http://localhost:5001/users/${id}`);
        if (!data.ok) {
            throw new Error('User not found');
        }
        const response = await data.json();
        return response;
    };

    const all = async () => {
        const gardens = await getGardens();
        console.log(gardens);
        const gardenUserPairs = await Promise.all(
            gardens.map(async (garden) => {
                const user = await getUser(garden.owner);
                return { garden, user }; // Retourner un objet qui associe le jardin et le propriétaire
            })
        );

        setGardenUserPairs(gardenUserPairs); // Mettre à jour l'état avec les paires jardin-utilisateur
    };

    useEffect(() => {
        all();
    }, []);

    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col pt-24 gap-8">
                <h1>Les jardins</h1>
            </section>
            <Footer />
        </>
    )
}