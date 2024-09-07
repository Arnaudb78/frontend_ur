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
        <div className="flex flex-col justify-center items-center gap-6 sm:gap-10 md:gap-14 lg:gap-20 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-32  bg-secondary-300 rounded-2xl text-sm md:text-lg lg:text-xl">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">{title}</h2>
            <h3 className="font-bold text-lg"><span className="underline">Etape 1 :</span> {subtitle1}</h3>
            <p>{content1}</p>
            <img src={img1} alt="Photo de jardin potager" className="w-96 h-72 rounded-xl border-secondary-100 border object-cover md:w-[600px] md:h-[400px] xl:w-[700px] xl:h-[500px]"/>
            <h3 className="font-bold text-lg"><span className="underline">Etape 2 :</span> {subtitle2}</h3>
            <p>{content2}</p>
            <img src={img2} alt="Photo de jardin potager" className="w-96 h-72 rounded-xl border-secondary-100 border object-cover md:w-[600px] md:h-[400px] xl:w-[700px] xl:h-[500px]"/>
            <h3 className="font-bold text-lg"><span className="underline">Etape 3 :</span> {subtitle3}</h3>
            <p>{content3}</p>
            <img src={img3} alt="Photo de jardin potager" className="w-96 h-72 rounded-xl border-secondary-100 border object-cover md:w-[600px] md:h-[400px] xl:w-[700px] xl:h-[500px]"/>
        </div>
    );
}
