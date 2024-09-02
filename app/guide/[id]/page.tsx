"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Guide from "@/components/guide/guide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface GuideProps {
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
    const { id } = useParams();
    const [guide, setGuide] = useState<GuideProps | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const getGuideData = async () => {
        if (id) {
            try {
                const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/guide/${id}`);
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

    function handleBack() {
        router.back();
    }

    return (
        <Suspense>
            <Navbar />
            <section className="flex flex-col gap-4 p-8 pt-24 bg-secondary-100">
                <div onClick={handleBack} className="w-full flex items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                    <p>Revenir aux guides</p>
                </div>
                {guide ? <Guide {...guide} /> : <p>Loading...</p>}</section>
            <Footer />
        </Suspense>
    );
}
