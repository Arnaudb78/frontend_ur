"use client";

import { useEffect } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

interface PostProps {
    _id: string;
    content: string;
    thread: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export default function Post(props: PostProps) {
    useEffect(() => {
    }, [props]);

    return (
        <>
            <div className="w-full h-full bg-secondary-200 flex flex-col gap-2 p-4 rounded-2xl text-sm">
                <h2 className="font-bold">{props.author}</h2>
                <p>{props.content}</p>
                <p><span className="font-bold">Créé : </span>{props.createdAt}</p>
                <p><span className="font-bold">Mis à jour :</span> {props.updatedAt}</p>
            </div>
        </>
    );
}
