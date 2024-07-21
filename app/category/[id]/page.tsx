"use client";

import Thread from "@/components/forum/thread";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface ThreadProps {
    _id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    post: string[]; // Utilisation correcte pour les tableaux
    createdAt: string;
    updatedAt: string;
}

export default function DetailsPage() {
    const { id } = useParams();
    const [threads, setThreads] = useState<ThreadProps[]>([]); // Tableau de threads

    const getData = async () => {
        if (id) {
            try {
                const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/forum/thread/${id}`);
                const data = await response.json();
                setThreads(data); // Assurez-vous que data est un tableau
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
    }

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <div className="flex flex-col gap-4 p-8">
                {threads.length > 0 ? (
                    threads.map(thread => <Thread key={thread._id} {...thread} />) // Passez chaque thread en prop
                ) : (
                    <div>Pas encore de sujet.</div>
                )}
            </div>
            <Footer />
        </Suspense>
    );
}
