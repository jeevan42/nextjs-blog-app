"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default async function AccountClient({ session }: { session: Session | null }) {
    const router = useRouter();
    return (
        <div className="p-6">
            <button
                onClick={() => router.push("/dashboard")}
                style={{ position: "absolute", top: 10, right: 100 }}
            >
                Dashboard
            </button>
            <h1 className="text-2xl font-bold mb-4">Account</h1>
            <div className="flex itesm-center gap-4">
                {session?.user?.image && (
                    <Image
                        src={session?.user?.image ?? ""}
                        alt={session?.user.name ?? "User"}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                )}
            </div>
            <p><strong>Name:</strong>{session?.user?.name}</p>
            <p><strong>Email:</strong>{session?.user?.email}</p>
        </div>
    )
}