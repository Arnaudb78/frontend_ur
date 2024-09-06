"use client";

import { useEffect } from "react";

interface PostProps {
    _id: string;
    content: string;
    thread: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export default function Post(props: PostProps) {
    useEffect(() => {}, [props]);

    return (
        <>
            <div className="w-full h-full bg-secondary-200 flex flex-col gap-2 p-4 rounded-2xl text-sm md:text-lg lg:text-xl">
                <h2 className="font-bold">{props.author}</h2>
                <p>
                    <span className="font-bold">Commentaire :</span> {props.content}
                </p>
                <p>
                    <span className="font-bold">Date : </span>
                    {props.createdAt}
                </p>
            </div>
        </>
    );
}
