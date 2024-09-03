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

    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col pt-24 gap-8">
                <FontAwesomeIcon onClick={handleBack} icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                <h1>Informations du compte</h1>
                <div>
                    <h2 className="font-bold">Prénom</h2>
                    <p>{informations?.firstname}</p>
                    <h2 className="font-bold">Nom</h2>
                    <p>{informations?.lastname}</p>
                    <h2 className="font-bold">Email</h2>
                    <p>{informations?.mail}</p>
                    <h2 className="font-bold">Newsletter</h2>
                    <p>{informations?.isNewsletter ? "Inscrit" : "Non inscrit"}</p>
                </div>
            </section>
            <Footer />
        </>
    );
}
