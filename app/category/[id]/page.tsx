"use client";

import Thread from "@/components/forum/thread";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
    const router = useRouter();

    const getData = async () => {
        if (id) {
            try {
                const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/forum/thread/${id}`);
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

    function handleBack() {
        router.back();
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Navbar />

            <section className="flex flex-col gap-4 p-8 pt-24 bg-secondary-100">
                <div>
                    <p className="text-xl text-center font-bold">
                        Choisissez un <span className="bg-secondary-300 text-secondary-100 inline-block rotate-3">sujet</span> !
                    </p>
                </div>
                <div onClick={handleBack} className="w-full flex items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                    <p>Revenir aux catégories</p>
                </div>
                <div className=" flex flex-col gap-4">
                    {threads.length > 0 ? (
                        threads.map((thread) => <Thread key={thread._id} {...thread} bool={bool} />)
                    ) : (
                        <div>Pas encore de sujet.</div>
                    )}
                </div>
            </section>
            <Footer />
        </Suspense>
    );
}
