"use client";

import { signOut } from "next-auth/react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div>
        <button onClick={() => signOut({ callbackUrl: "/signin" })}>
            Logout
        </button>
        {children}
    </div>;
}