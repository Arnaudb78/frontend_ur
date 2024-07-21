"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
}

export default function Forum() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    const getData = async () => {
        const response = await fetch("https://urban-roots-ada879145d2c.herokuapp.com/forum/category", {});
        const data = await response.json();
        setCategories(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleClick = (id: string) => {
        router.push(`/category/${id}`);
    };

    return (
        <>
            <Navbar />
            <section className="p-6 w-full h-full bg-secondary-100">
                <div className="flex flex-col gap-8">
                    <p className="text-xl text-center font-bold">
                        Ici, retrouve toutes les <span className="bg-secondary-300 text-secondary-100 inline-block rotate-3">catégories</span> de notre forum.
                    </p>
                    <div className="w-full h-full bg-primary flex flex-col gap-4 p-4 rounded-2xl">
                        {categories.map((category) => (
                            <div key={category._id}  
                            className="bg-secondary-200 flex justify-between px-4 py-2 rounded-lg text-sm"
                            onClick={() => handleClick(category._id)}
                            >
                                <p className="font-bold">{category.name}</p>
                                <p>{category.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
