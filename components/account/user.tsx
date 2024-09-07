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
        <section className="w-full h-full bg-secondary-100 p-6 flex flex-col gap-8 lg:items-center lg:gap-12 xl:gap-16">
            <h2 className="font-bold text-center md:text-2xl lg:text-3xl xl:text-4xl">Mon compte</h2>
            <div className="w-full flex">
                <ul className="w-full flex flex-col gap-4 text-sm md:text-lg lg:text-xl lg:flex-row lg:justify-evenly xl:gap-10">
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
            </div>
            <button onClick={disconnect} className="bg-secondary-300 p-2 rounded-md gap-4 font-bold lg:w-1/2">
                <FontAwesomeIcon className="w-6 h-6 text-center" icon={faPowerOff}></FontAwesomeIcon>
                <p>Déconnexion</p>
            </button>
        </section>
    );
}
