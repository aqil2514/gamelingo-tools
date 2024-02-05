import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserInfo from "./UserInfo";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const user = await supabase
    .from("userslogin")
    .select("username, email, name, role, id,image")
    .eq("id", (session?.user as Account.User)?.id);
  const userData = user!.data![0] as Account.User;

  if (!session) {
    redirect("/");
  }
  return (
    <div className="bg-zinc-900 min-h-screen w-full py-20">
      <h1 className=" font-nova-square text-white font-bold text-center text-5xl">Informasi Akun</h1>
      <UserInfo data={userData} />
    </div>
  );
}
