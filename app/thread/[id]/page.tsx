"use client";

import Footer from "@/components/footer";
import Post from "@/components/forum/post";
import Thread from "@/components/forum/thread";
import Navbar from "@/components/navbar";
import { access } from "fs";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface PostProps {
    _id: string;
    content: string;
    thread: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

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

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState<PostProps[]>([]);
    const [thread, setThread] = useState<ThreadProps | null>(null); // Utilisation d'un objet ou null
    const [bool, setBool] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [comment, setComment] = useState("");

    function handleConnect() {
        if (sessionStorage.getItem("user")) {
            setIsConnected(true);
        }
    }

    const getPostData = async () => {
        if (id) {
            try {
                const response = await fetch(`http://localhost:5001/forum/post/${id}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
    };

    const getThreadData = async () => {
        if (id) {
            try {
                const response = await fetch(`http://localhost:5001/forum/threadId/${id}`);
                const data = await response.json();
                setThread(data);
                setBool(true);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
    };

    useEffect(() => {
        getPostData();
        getThreadData();
        handleConnect();
    }, [id]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!comment) {
            alert("Veuillez écrire un commentaire.");
            return;
        }

        try {
            const response =  await fetch(`http://localhost:5001/forum/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: comment,
                    thread: id,
                    accessToken: JSON.parse(sessionStorage.getItem("user")).accessToken,
                }),
            } )

            if (response.status === 400) return alert("Informations invalides.");
            if (response.status === 404) return alert("Utilisateur non trouvé.");
            if (response.status === 500) return alert("Erreur de connexion au server.");
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }

        setComment("");
        getPostData();
    };
        

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <div className="flex flex-col gap-4 p-8 pt-24">
                {thread ? <Thread {...thread} bool={bool} /> : <div>Chargement du sujet...</div>}
                {post.length > 0 ? post.map((post) => <Post key={post._id} {...post} />) : <div>Pas encore de post.</div>}
            </div>
            { isConnected ? (
                <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-8 p-8 text-center">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Écrire un commentaire..."
                  required
                  className="w-full h-32 p-4 bg-secondary-200 rounded-2xl"
                />
                <button type="submit" className="bg-primary px-4 py-3 font-bold rounded-2xl hover:bg-green-800 hover:text-secondary-200">Poster le commentaire</button>
              </form>
            ) : (
                <></>
            )}
            <Footer />
        </Suspense>
    );
}
