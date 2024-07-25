"use client";

import FormLogin from "@/components/connect/formLogin";
import FormRegister from "@/components/connect/formRegister";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function Connect() {
    const [showSignup, setShowSignup] = useState(false);

    return (
        <>
            <Navbar />
            <div className="p-6 w-full h-full bg-secondary-100 pt-24">
                {showSignup ? <FormRegister setShowSignup={setShowSignup} /> : <FormLogin setShowSignup={setShowSignup} />}
            </div>
            <Footer />
        </>
    );
}
