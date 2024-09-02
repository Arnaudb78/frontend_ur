"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Guide from "@/components/guide/guide";

interface GuideProps {
    _id: string;
    title: string;
    description: string;
    subtitle1: string;
    content1: string;
    subtitle2: string;
    content2: string;
    subtitle3: string;
    content3: string;
}

export default function GuidePage() {
    const { id } = useParams();
    const [guide, setGuide] = useState<GuideProps | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const getGuideData = async () => {
        if (id) {
            try {
                const response = await fetch(`http://localhost:5001/guide/${id}`);
                const data = await response.json();
                setGuide(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
    };

    useEffect(() => {
        getGuideData();
    }, [id]);

    return (
        <Suspense>
            <Navbar />
            <section className="flex flex-col gap-4 p-8 pt-24">{guide ? <Guide {...guide} /> : <p>Loading...</p>}</section>
            <Footer />
        </Suspense>
    );
}
