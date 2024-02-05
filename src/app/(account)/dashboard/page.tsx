import { Metadata } from "next";
import { getUser } from "@/utils/api";
import { redirect } from "next/navigation";
import UserInfo from "./UserInfo";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const userData = await getUser();

  if (!userData) redirect("/");

  return (
    <div className="bg-zinc-900 min-h-screen w-full py-20">
      <h1 className=" font-nova-square text-white font-bold text-center text-5xl">Informasi Akun</h1>
      <UserInfo data={userData} />
    </div>
  );
}
