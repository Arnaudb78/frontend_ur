"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Custom404() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex flex-col justify-center items-center p-8">
                <h1 className="text-4xl font-bold mb-4 animate-pulse">404 - Page non trouvée</h1>
                <p className="text-lg mb-8">Oups ! La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
                <a href="/" className="bg-primary px-4 py-3 font-bold rounded-2xl hover:bg-green-800 hover:text-secondary-200">
                    Retour à l&apos;accueil
                </a>
            </main>
            <Footer />
        </div>
    );
}
