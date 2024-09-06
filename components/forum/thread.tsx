"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface ThreadProps {
    _id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    post: string[];
    createdAt: string;
    updatedAt: string;
    bool: boolean;
}

export default function Thread(props: ThreadProps) {
    const { bool, _id, title, content, author, createdAt, updatedAt } = props;
    const router = useRouter();

    useEffect(() => {}, [props]);

    const handleClick = (id: string) => {
        router.push(`/thread/${id}`);
    };

    return (
        <>
            {bool ? (
                <div className="flex flex-col gap-2 p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 bg-secondary-300 rounded-2xl cursor-pointer text-sm md:text-lg lg:text-xl">
                    <h2 className="font-bold">{title}</h2>
                    <p>{content}</p>
                    <p>
                        <span className="font-bold">Author:</span> {author}
                    </p>
                    <p>
                        <span className="font-bold">Créé : </span>
                        {createdAt}
                    </p>
                    <p>
                        <span className="font-bold">Mis à jour :</span> {updatedAt}
                    </p>
                </div>
            ) : (
                <div
                    onClick={() => handleClick(props._id)}
                    className="flex flex-col gap-2 p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 bg-secondary-200 rounded-2xl cursor-pointer text-sm md:text-lg lg:text-xl">
                    <h2 className="font-bold">{title}</h2>
                    <p>{content}</p>
                    <p>
                        <span className="font-bold">Author:</span> {author}
                    </p>
                    <p>
                        <span className="font-bold">Créé : </span>
                        {createdAt}
                    </p>
                    <p>
                        <span className="font-bold">Mis à jour :</span> {updatedAt}
                    </p>
                </div>
            )}
        </>
    );
}
