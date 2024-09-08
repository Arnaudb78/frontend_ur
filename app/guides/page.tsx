"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Guides {
    _id: string;
    title: string;
    description: string;
    subtitle1: string;
    content1: string;
    img1: string;
    subtitle2: string;
    content2: string;
    img2: string
    subtitle3: string;
    content3: string;
    img3: string;
}

export default function GuidePage() {
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(false);

    function handleConnect() {
        if (sessionStorage.getItem("user")) {
            setIsConnected(true);
        }
    }

    function refirectToLogin() {
        if (!isConnected) {
        }
    }

    const [guides, setGuides] = useState<Guides[]>([]);

    useEffect(() => {
        fetch("http://localhost:5001/guide")
            .then((res) => res.json())
            .then((data) => setGuides(data));
    }, []);

    const handleClick = (id: string) => {
        router.push(`/guide/${id}`);
    };

    return (
        <>
            <Navbar />
            <section className="p-6 w-full h-full bg-secondary-100 pt-24 md:pt-28 lg:pt-30 xl:pt-36 xl:p-20">
                <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 md:gap-6 lg:gap-10 xl:gap-12 2xl:gap-14">
                    <p className="text-xl text-center font-bold md:text-2xl lg:text-3xl xl:text-4xl">
                        Ici, retrouve tous les <span className="bg-secondary-300 text-secondary-100 inline-block rotate-3">guides</span> disponible actuellement.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
                        {guides.map((guide) => (
                            <div key={guide._id} onClick={() => handleClick(guide._id)} className="bg-white p-4 rounded-md shadow-md cursor-pointer flex flex-col gap-4 text-sm md:text-lg lg:text-xl lg:p-8">
                                <h2 className="font-bold">{guide.title}</h2>
                                <p>{guide.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
