"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
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
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    function clearStorage() {
        sessionStorage.clear();
    }

    return (
        <>
        <nav className="w-full p-6 bg-primary" style={{ zIndex: 999 }}>
            <div className="w-full flex justify-between">
                <a href="/" className="font-bold text-xl">UrbanRoots</a>
                <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="w-8 h-8"/>
            </div>
           <ul>
            <li><a href="/map">Carte</a></li>
            <li><a href="/forum">Forum</a></li>
            <li><a href="/guide">Guide</a></li>
            <li><a href="/connect">Connexion</a></li>
           </ul>
        </nav>
        </>
    );
}
