"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Map from "@/components/map/importMap";

export default function MapPage() {
    return (
        <>
            <Navbar />
            <section className="p-6 w-full h-full bg-secondary-100 pt-24">
                <Map />
            </section>
            <Footer />
        </>
    );
}
