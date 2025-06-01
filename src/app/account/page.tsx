import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountClient from "./AccountClient";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/signin");
    return <AccountClient session={session} />
}