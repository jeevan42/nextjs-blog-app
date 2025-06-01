"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

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
