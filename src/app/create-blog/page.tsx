"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateBlogPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/blogs", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            router.push("/dashboard");
        }
    }

    return (<div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Title"
                className="border p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                className="border p-2 w-full h-40"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
            >
                Publish
            </button>
        </form>
    </div>)
}