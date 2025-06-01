import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/signin");

    const user = session.user;
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Account</h1>
            <div className="flex itesm-center gap-4">
                {user?.image && (
                    <Image
                        src={user.image}
                        alt={user.name ?? "User"}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                )}
            </div>
            <p><strong>Name:</strong>{user?.name}</p>
            <p><strong>Email:</strong>{user?.email}</p>
        </div>
    )
}