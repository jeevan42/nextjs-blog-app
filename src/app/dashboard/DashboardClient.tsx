"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Blog = {
    _id: string,
    title: string,
    content: string,
    createdAt: string,
};
export default function DashboardClient({ session }: { session: Session | null }) {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            if (Array.isArray(data.data)) {
                setBlogs(data.data);
            }
        }
        fetchBlogs();
    }, []);
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
            {blogs.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
                <ul className="space-y-4">
                    {blogs.map((blog) => {
                        const { _id, title, createdAt } = blog;
                        return (
                            <li key={_id} className="border p-4 rounded shadow">
                                <Link href={`/blog/${_id}`} className="text-lg font-semibold hover:underline">
                                    {title}
                                </Link>
                                <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
                            </li>
                        )
                    })}
                </ul>
            )}
            <button
                onClick={() => router.push("/account")}
                style={{ position: "absolute", top: 10, right: 100 }}
            >
                View Account
            </button>
        </div>
    );
}
