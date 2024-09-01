"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Guides {
    title: string;
    description: string;
}

export default function GuidePage() {

    const [isConnected, setIsConnected] = useState(false);

    function handleConnect() {
        if (sessionStorage.getItem("user")) {
            setIsConnected(true);
        }
    }

    function refirectToLogin(){
        if (!isConnected) {
           
        }
    }

    const [guides, setGuides] = useState<Guides[]>([]);

    useEffect(() => {
        fetch("http://localhost:5001/guide")
            .then((res) => res.json())
            .then((data) => setGuides(data));
    }, []);

    return (
        <>
            <Navbar />
            <section className="p-6 w-full h-full bg-secondary-100 pt-24">
                <div className="w-full max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center">Guides</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {guides.map((guide, index) => (
                            <div key={index} className="bg-white p-4 rounded-md shadow-md">
                                <h2 className="text-xl font-bold">{guide.title}</h2>
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