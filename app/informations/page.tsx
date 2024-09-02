"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProps {
    _id: string;
    firstname: string;
    lastname: string;
    mail: string;
    rules: string;
    isNewsletter: boolean;
    role: string;
}

export default function informations() {
    const router = useRouter();
    const [informations, setInformations] = useState<UserProps | null>(null);

    function handleBack() {
        router.back();
    }

    const getInformations = async () => {
        const user = sessionStorage.getItem("user");

        if (user) {
            try {
                const userObject = JSON.parse(user);
                console.log(userObject.accessToken);
                const response = await fetch("http://localhost:5001/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ accessToken: userObject.accessToken }),
                });
                const data = await response.json();
                setInformations(data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        getInformations();
    });

    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col pt-24 gap-8">
                <FontAwesomeIcon onClick={handleBack} icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                <h1>Informations du compte</h1>
                <div>
                    <h2>Prénom</h2>
                    <p>{informations?.firstname}</p>
                </div>
            </section>
            <Footer />
        </>
    );
}
