import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Blog from "@/lib/models/blog.model";
import { connectDB } from "@/lib/db";
import { z } from "zod";

const blogSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});


export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        await connectDB();
        const blogs = await Blog.find();

        return NextResponse.json({ message: "Blogs fetched", data: blogs }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json();
        const parsed = blogSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
        }

        await connectDB();

        const newBlog = await Blog.create({
            title: parsed.data.title,
            content: parsed.data.content,
            author: session.user.id,
        });

        return NextResponse.json({ message: "Blog created", blog: newBlog }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

