"use client";

import Footer from "@/components/footer";
import Post from "@/components/forum/post";
import Thread from "@/components/forum/thread";
import Navbar from "@/components/navbar";
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
    }, [id]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <div className="flex flex-col gap-4 p-8 pt-24">
                {thread ? <Thread {...thread} bool={bool} /> : <div>Chargement du sujet...</div>}
                {post.length > 0 ? post.map((post) => <Post key={post._id} {...post} />) : <div>Pas encore de post.</div>}
            </div>
            <Footer />
        </Suspense>
    );
}
