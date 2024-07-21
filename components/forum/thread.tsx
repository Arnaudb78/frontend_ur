"use client";

import { useEffect } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

interface ThreadProps {
    _id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    post: string[];
    createdAt: string;
    updatedAt: string;
}

export default function Thread(props: ThreadProps) {
    useEffect(() => {
    }, [props]);

    return (
        <>
            <div className="w-full h-full bg-secondary-200 flex flex-col gap-2 p-4 rounded-2xl text-sm">
                <h2 className="font-bold">{props.title}</h2>
                <p>{props.content}</p>
                <p><span className="font-bold">Author:</span> {props.author}</p>
                <p><span className="font-bold">Créé : </span>{props.createdAt}</p>
                <p><span className="font-bold">Mis à jour :</span> {props.updatedAt}</p>
            </div>
        </>
    );
}
