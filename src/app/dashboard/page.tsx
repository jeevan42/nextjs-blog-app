import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  return <DashboardClient session={session}></DashboardClient>
}
