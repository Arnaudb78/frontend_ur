"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Map from "@/components/map/importMap";

export default function MapPage() {
    return (
        <>
            <Navbar />
            <section className="p-6  w-full h-full bg-secondary-100 pt-24 sm:p-8 sm:pt-24 md:p-10 md:pt-28 lg:pt-30 xl:pt-36 xl:p-20">
                <Map />
            </section>
            <Footer />
        </>
    );
}
