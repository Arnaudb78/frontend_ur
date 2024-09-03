"use client";

import Footer from "@/components/footer";
import Post from "@/components/forum/post";
import Thread from "@/components/forum/thread";
import Navbar from "@/components/navbar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
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
    const router = useRouter();

    function handleConnect() {
        if (sessionStorage.getItem("user")) {
            setIsConnected(true);
        }
    }

    const getPostData = async () => {
        if (id) {
            try {
                const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/forum/post/${id}`);
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
                const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/forum/threadId/${id}`);
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

    function handleBack() {
        router.back();
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!comment) {
            alert("Veuillez écrire un commentaire.");
            return;
        }

        const user = sessionStorage.getItem("user");
        if (!user) {
            alert("Utilisateur non connecté.");
            return;
        }

        const accessToken = JSON.parse(user).accessToken;
        if (!accessToken) {
            alert("Token d'accès manquant.");
            return;
        }

        try {
            const response = await fetch(`https://urban-roots-ada879145d2c.herokuapp.com/forum/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: comment,
                    thread: id,
                    accessToken: accessToken,
                }),
            });

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
            <section className="flex flex-col gap-4 p-8 pt-24 bg-secondary-100">
                <div className="flex flex-col gap-4">
                <div onClick={handleBack} className="w-full flex items-center gap-2">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-10 h-10 text-2xl cursor-pointer" />
                    <p>Revenir aux sujets</p>
                </div>
                    {thread ? <Thread {...thread} bool={bool} /> : <div>Chargement du sujet...</div>}
                    <div>
                        <p className="text-xl text-center font-bold">
                            N&apos;hésitez pas à <span className="bg-primary text-secondary-100 inline-block rotate-3">échanger</span> avec la
                            communauté !
                        </p>
                    </div>
                    <div className="w-full h-[1px] bg-black"></div>
                    {post.length > 0 ? post.map((post) => <Post key={post._id} {...post} />) : <div>Pas encore de post.</div>}
                </div>

                {isConnected ? (
                    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-8 p-8 text-center">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Écrire un commentaire..."
                            required
                            className="w-full h-32 p-4 bg-secondary-200 rounded-2xl"
                        />
                        <button type="submit" className="bg-primary px-4 py-3 font-bold rounded-2xl hover:bg-green-800 hover:text-secondary-200">
                            Poster le commentaire
                        </button>
                    </form>
                ) : (
                    <div>
                        <p className="text-center">Connectez-vous pour poster un commentaire.</p>
                    </div>
                )}
            </section>
            <Footer />
        </Suspense>
    );
}
