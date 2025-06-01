import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  return <DashboardClient session={session}></DashboardClient>
}
