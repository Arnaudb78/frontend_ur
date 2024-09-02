"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Garden() {
    const router = useRouter();

    function handleBack() {
        router.back();
    }

    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col pt-24 gap-8">
                <FontAwesomeIcon onClick={handleBack} icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                <h1>Mes jardins</h1>
            </section>
            <Footer />
        </>
    );
}
