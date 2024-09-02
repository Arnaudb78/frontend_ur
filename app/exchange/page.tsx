"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Exchange() {
    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col pt-24 gap-8">
                <h1>Page des Échange</h1>
            </section>
            <Footer />
        </>
    );
}
