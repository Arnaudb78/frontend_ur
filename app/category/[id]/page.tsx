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
    post: string[];
    createdAt: string;
    updatedAt: string;
}

export default function DetailsPage() {
    const { id } = useParams();
    const [threads, setThreads] = useState<ThreadProps[]>([]);
    const [bool, setBool] = useState(false);

    const getData = async () => {
        if (id) {
            try {
                const response = await fetch(`http://localhost:5001/forum/thread/${id}`);
                const data = await response.json();
                setThreads(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <div className="flex flex-col gap-4 p-8 pt-24">
                {threads.length > 0 ? threads.map((thread) => <Thread key={thread._id} {...thread} bool={bool} />) : <div>Pas encore de sujet.</div>}
            </div>
            <Footer />
        </Suspense>
    );
}
