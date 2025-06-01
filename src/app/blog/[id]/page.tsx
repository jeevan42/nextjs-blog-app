export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/db";
import Blog from "@/lib/models/blog.model";
import { notFound } from "next/navigation";


type BlogType = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};


export default async function BlogDetailPage({ params }: { params: { id: string }}) {
    await connectDB();

    const blog = await Blog.findById(params.id).lean<BlogType>();

    if (!blog) return notFound();

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
                {new Date(blog.createdAt).toLocaleString()}
            </p>
            <p>{blog.content}</p>
        </div>
    )

}