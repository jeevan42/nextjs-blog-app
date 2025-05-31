import { NextResponse } from "next/server"; // Used to redirect, rewrite, or continue the request
import type { NextRequest } from "next/server"; // Type for incoming request object (for TypeScript safety)
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    console.log("Middleware hit", request.nextUrl.pathname);

    const token = await getToken({ req: request, secret: authOptions.secret });
    console.log(`token`, token)

    const isAuthPage = request.nextUrl.pathname === '/signin';

    // If user is logged in and visiting /signin -> redirect to home
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    // If NOT logged in and visiting protected route -> redirect to /signin
    const protectedPaths = ["/dashboard", "/account"];
    const isProtected = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/account/:path*", "/signin"],
}