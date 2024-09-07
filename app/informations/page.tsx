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

export default function Informations() {
    const router = useRouter();
    const [informations, setInformations] = useState<UserProps | null>(null);
    const [message, setMessage] = useState("");

    function handleBack() {
        router.back();
    }

    const getInformations = async () => {
        const user = sessionStorage.getItem("user");

        if (user) {
            try {
                const userObject = JSON.parse(user);
                const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/users/${userObject.accessToken}`).then((res) => res.json());

                if(response.status === 400) {
                    alert("Token invalide, veuillez vous reconnecter.");
                    router.push("/login");
                }
                if(response.status === 404) {
                    alert("Utilisateur introuvable, vous allez être redirigé vers la page de connexion.");	
                    router.push("/login");
                }

                setInformations(response);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        getInformations();
    }, []);

    function handleClick() {
        setMessage("Fonctionnalité à venir.");
    }

    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col justify-center items-center pt-24 gap-8 md:pt-30 lg:pt-36 xl:pt-36 xl:p-20">
                <div onClick={handleBack} className="w-full flex items-center gap-2 md:text-lg lg:text-xl">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-10 h-10 cursor-pointer" />
                    <p>Mon compte</p>
                </div>
                <div className="w-full flex justify-evenly text-center text-sm md:text-lg lg:text-xl">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold">Prénom</h2>
                        <p>{informations?.firstname}</p>
                        <h2 className="font-bold">Nom</h2>
                        <p>{informations?.lastname}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="font-bold">Email</h2>
                        <p>{informations?.mail}</p>
                        <h2 className="font-bold">Newsletter</h2>
                        <p>{informations?.isNewsletter ? "Inscrit" : "Non inscrit"}</p>
                    </div>
                </div>
                {message && <p className="text-red-500 text-center">{message}</p>}
                <button
                    onClick={handleClick}
                    className="bg-primary px-4 py-3 font-bold rounded-2xl text-center hover:bg-green-800 hover:text-secondary-200 md:text-lg md:w-[60%] lg:text-xl xl:w-[40%] xl:text-2xl ">
                    Editer mon profil
                </button>
            </section>
            <Footer />
        </>
    );
}
