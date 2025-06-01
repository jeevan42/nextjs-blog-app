"use client";

import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardClient({ session }: { session: Session | null }) {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);
    console.log(`blogs =>`, blogs)
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
            <button
                onClick={() => router.push("/account")}
                style={{ position: "absolute", top: 10, right: 100 }}
            >
                View Account
            </button>
        </div>
    );
}
