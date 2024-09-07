"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function MyExchange() {
    const router = useRouter();

    function handleBack() {
        router.back();
    }

    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col pt-24 gap-8 md:pt-30 lg:pt-36 xl:pt-36 xl:p-20">
                <div onClick={handleBack} className="w-full flex items-center gap-2 md:text-lg lg:text-xl">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-10 h-10 cursor-pointer" />
                    <p>Mon compte</p>
                </div>
                <h2 className="text-center font-bold md:text-lg lg:text-xl animate-bounce">Page en cours de développement.</h2>
            </section>
            <Footer />
        </>
    );
}
