"use client";

import { useEffect } from "react";

interface GuideProps {
    _id: string;
    title: string;
    description: string;
    subtitle1: string;
    content1: string;
    subtitle2: string;
    content2: string;
    subtitle3: string;
    content3: string;
}

export default function Guide(props: GuideProps) {
    const { _id, title, description, subtitle1, content1, subtitle2, content2, subtitle3, content3 } = props;

    useEffect(() => {}, [props]);

    return (
        <div className="flex flex-col gap-2 p-4 bg-secondary-300 rounded-2xl text-sm">
            <h2 className="font-bold text-lg">{title}</h2>
            <p>{description}</p>
            <h3 className="font-bold text-sm">{subtitle1}</h3>
            <p>{content1}</p>
            <h3 className="font-bold text-sm">{subtitle2}</h3>
            <p>{content2}</p>
            <h3 className="font-bold text-sm">{subtitle3}</h3>
            <p>{content3}</p>
        </div>
    );
}
