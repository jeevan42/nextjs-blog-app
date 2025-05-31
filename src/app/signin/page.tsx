"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function SignInPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // ⏳ Don't do anything yet
        if (session) {
            router.push("/"); // Already signed in, redirect to home
        } else {
            signIn("google", { callbackUrl: "/" }); // Trigger Google sign-in
        }
    }, [session, status, router]);

    return <p>Redirecting to Google Sign-In...</p>;
}