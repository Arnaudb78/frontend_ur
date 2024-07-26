"use client";

interface MentionProps {
    id: number;
    title: string;
    content: string;
}

export default function Mention({ id, title, content }: MentionProps) {
    return (
        <div className="p-8 flex flex-col gap-2 items-start bg-secondary-200 rounded-2xl text-sm">
            <h2 className="font-bold text-lg">
                {id}.{title}
            </h2>
            <p>{content}</p>
        </div>
    );
}
