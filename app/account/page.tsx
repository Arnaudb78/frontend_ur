"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
    const router = useRouter();
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const session = sessionStorage.getItem("user");
        if (session) {
            const user = JSON.parse(session);
            const accessToken = user.accessToken;
            verifyToken(accessToken);
        } else {
            router.push("/login");
        }
    }, []);

    const verifyToken = async (accessToken: string) => {
        const response = await fetch("http://localhost:5001/users/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken: accessToken }),
        });
        if (response.status === 400 || response.status === 401 || response.status === 404 || response.status === 500) {
            clearStorage();
            router.push("/login");
        } else {
            const data = await response.json();
            sessionStorage.setItem("user", JSON.stringify(data));
            if (data.admin === true) setAdmin(true);
        }
    };

    function clearStorage() {
        sessionStorage.clear();
        router.push("/connect");
    }

    return (
        <>
            <Navbar />
            <section className="bg-secondary-300 w-full h-full p-8">
                <p>Mon compte</p>
                {admin ? <p>Je suis un grand ADMIN</p> : <p>Je suis un petit user</p>}
            </section>
            <Footer />
        </>
    );
}
