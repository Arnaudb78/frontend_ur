"use client";

import { useState } from "react";

export default function Admin(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");



    return (
        <>
            <section className="w-full h-full p-8 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <p>Forum</p>
                    <div className="flex flex-col gap-4">
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nom de la catégorie" />
                        <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description de la catégorie" />
                    </div>
                    <button className="bg-red-200 py-2 px-4 rounded-lg">Ajouter une catégorie</button>
                </div>
                <div>
                    <p>Guide</p>
                </div>
                <div>
                    <p>Jardin</p>
                </div>
            </section>
        </>
    );
}