"use client";

import { useEffect } from "react";

interface GuideProps {
    _id: string;
    title: string;
    description: string;
    subtitle1: string;
    content1: string;
    img1: string;
    subtitle2: string;
    content2: string;
    img2: string
    subtitle3: string;
    content3: string;
    img3: string;
}

export default function Guide(props: GuideProps) {
    const { _id, title, description, subtitle1, content1, img1, subtitle2, content2, img2, subtitle3, content3, img3 } = props;

    useEffect(() => {}, [props]);

    return (
        <div className="flex flex-col gap-6 p-4 bg-secondary-300 rounded-2xl text-sm">
            <h2 className="font-bold text-lg">{title}</h2>
            <h3 className="font-bold text-sm"><span className="underline">Etape 1 :</span> {subtitle1}</h3>
            <p>{content1}</p>
            <img src={img1} alt="Photo de jardin potager" />
            <h3 className="font-bold text-sm"><span className="underline">Etape 2 :</span> {subtitle2}</h3>
            <p>{content2}</p>
            <img src={img2} alt="Photo de jardin potager" />
            <h3 className="font-bold text-sm"><span className="underline">Etape 3 :</span> {subtitle3}</h3>
            <p>{content3}</p>
            <img src={img3} alt="Photo de jardin potager" />
        </div>
    );
}
