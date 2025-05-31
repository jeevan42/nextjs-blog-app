"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function AuthWrapper() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const showLogout = session && ["/dashboard", "/account"].some(path =>
    pathname.startsWith(path)
  );

  if (!showLogout) return null;

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signin" })}
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      Logout
    </button>
  );
}
