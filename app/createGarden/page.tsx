"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateGarden() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [street, setStreet] = useState("");
    const [complementary, setComplementary] = useState("");
    const [postCode, setPostCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !description || !capacity || !street || !postCode || !city || !country) {
            setMessage("Veuillez remplir tous les champs.");
        }

        const user = sessionStorage.getItem("user");
        if (!user) {
            alert("Utilisateur non connecté.");
            return;
        }

        const accessToken = JSON.parse(user).accessToken;
        if (!accessToken) {
            alert("Token d'accès manquant.");
            return;
        }

        try {
            const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/garden/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accessToken,
                    street,
                    complementary,
                    postCode,
                    city,
                    country,
                    name,
                    description,
                    capacity,
                }),
            });

            console.log(response);

            if (response.status === 400) {
                alert("Token invalide, veuillez vous reconnecter.");
                router.push("/login");
                return;
            }

            if (response.status === 201) {
                alert("Jardin créé avec succès !");
                router.push("/garden");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col pt-24 gap-8">
                <p className="text-xl text-center font-bold">
                    On <span className="bg-secondary-300 text-secondary-100 inline-block rotate-3">commence</span> l&apos;aventure !
                </p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4">
                    <label className="flex flex-col gap-2">
                        <p>Quel nom porte votre jardin ?</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="p-2 border border-solid border-secondary-300 rounded-full bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <p>Dites nous en plus sur votre jardin.</p>
                        <input
                            type="text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className="p-2 border border-solid border-secondary-300 rounded-full bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-center">
                        <p>Capacité d&apos;accueil ?</p>
                        <input
                            type="number"
                            value={capacity}
                            onChange={(event) => setCapacity(event.target.value)}
                            className="p-2 border border-solid border-secondary-300 rounded-full bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-center">
                        <p>Dans quelle rue se situe t-il ?</p>
                        <input
                            type="text"
                            value={street}
                            onChange={(event) => setStreet(event.target.value)}
                            className="p-2 border border-solid border-secondary-300 rounded-full bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-center">
                        <p>Un complément d&apos;adresse ?</p>
                        <input
                            type="text"
                            value={complementary}
                            onChange={(event) => setComplementary(event.target.value)}
                            className="p-2 border border-solid border-secondary-300 rounded-full bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-center">
                        <p>Quel est le code postale ?</p>
                        <input
                            type="text"
                            value={postCode}
                            onChange={(event) => setPostCode(event.target.value)}
                            className="p-2 border border-solid border-secondary-300 rounded-full bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-center">
                        <p>Dans quelle ville ?</p>
                        <input
                            type="text"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            className="p-2 border border-solid border-secondary-300 rounded-full bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-center">
                        <p>Dans quel pays est-il ?</p>
                        <input
                            type="text"
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            className="p-2 border border-solid border-secondary-300 rounded-full bg-transparent"
                        />
                    </label>
                    <p className="text-red-600 font-bold">{message}</p>
                    <button className="bg-primary text-black font-bold p-3 rounded-full" type="submit">
                        Ajouter mon jardin
                    </button>
                </form>
            </section>
            <Footer />
        </>
    )
}