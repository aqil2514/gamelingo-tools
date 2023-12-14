import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserInfo from "./userinfo";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div className="bg-zinc-900 min-h-screen w-full pb-10">
      <h1 className="mt-20 font-nova-square text-white font-bold text-center text-5xl">Informasi Akun</h1>
      <UserInfo />
    </div>
  );
}
