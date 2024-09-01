"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [menu, setMenu] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isConnected, setIsConnected] = useState(false);

    function toggleMenu() {
        setMenu(!menu);
    }

    function handleConnect() {
        if (sessionStorage.getItem("user")) {
            setIsConnected(true);
        }
    }
    useEffect(() => {
        handleConnect();
    }, []);
    // useEffect(() => {
    //     handleConnect();
    //     const handleScroll = () => {
    //         const currentScrollY = window.scrollY;

    //         if (currentScrollY > lastScrollY) {
    //             setIsVisible(false);
    //         } else {
    //             setIsVisible(true);
    //         }

    //         setLastScrollY(currentScrollY);
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, [lastScrollY]);

    function clearStorage() {
        sessionStorage.clear();
        router.push("/connect");
    }

    return (
        <>
            <nav className="w-full p-6 bg-primary text-md fixed" style={{ zIndex: 999 }}>
                <div className="w-full flex justify-between items-center">
                    <a href="/" className="font-bold text-xl">
                        UrbanRoots
                    </a>
                    <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="w-8 h-8 cursor-pointer" />
                </div>
                {menu && (
                    <ul className="mt-4 flex flex-col gap-2 transition-all duration-300">
                        <li>
                            <a href="/map">Carte</a>
                        </li>
                        <li>
                            <a href="/forum">Forum</a>
                        </li>
                        <li>
                            <a href="/guide">Guide</a>
                        </li>
                        <li>{isConnected ? <a href="/connect">Connexion</a> : <a href="/account">Mon compte</a> }</li>
                        <li>
                            {isConnected ?
                                (
                                    <></>
                                ) : (
                                <button className="flex gap-2 items-center" onClick={clearStorage}>
                                    <FontAwesomeIcon icon={faPowerOff} className="w-6 h-6 cursor-pointer" />
                                    <p className="text-sm">Deconnexion</p>
                                </button>
                            ) }
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
}
