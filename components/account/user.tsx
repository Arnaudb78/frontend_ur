"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTreeCity, faHandshake, faStar, faGears, faPowerOff } from "@fortawesome/free-solid-svg-icons";

export default function User() {
    const router = useRouter();

    function disconnect() {
        sessionStorage.clear();
        router.push("/connect");
    }

    return (
        <section className="w-full h-full bg-secondary-100 p-6 flex flex-col gap-8">
            <h1 className="text-xl font-bold text-center">Mon compte</h1>
            <ul className="flex flex-col gap-4 text-sm">
                <li className="flex gap-4">
                    <FontAwesomeIcon className="w-6 h-6" icon={faUser}></FontAwesomeIcon>
                    <a href="/informations">Mes informations</a>
                </li>
                <li className="flex gap-4">
                    <FontAwesomeIcon className="w-6 h-6" icon={faTreeCity}></FontAwesomeIcon>
                    <a href="/garden">Mes jardins</a>
                </li>
                <li className="flex gap-4">
                    <FontAwesomeIcon className="w-6 h-6" icon={faHandshake}></FontAwesomeIcon>
                    <a href="/myExchange">Mes échanges</a>
                </li>
                <li className="flex gap-4">
                    <FontAwesomeIcon className="w-6 h-6" icon={faStar}></FontAwesomeIcon>
                    <a href="">Mes favoris</a>
                </li>
                <li className="flex gap-4">
                    <FontAwesomeIcon className="w-6 h-6" icon={faGears}></FontAwesomeIcon>
                    <a href="">Paramètres</a>
                </li>
            </ul>
            <button onClick={disconnect} className="bg-secondary-300 p-2 rounded-md gap-4 font-bold">
                <FontAwesomeIcon className="w-6 h-6 text-center" icon={faPowerOff}></FontAwesomeIcon>
                <p>Déconnexion</p>
            </button>
        </section>
    );
}
