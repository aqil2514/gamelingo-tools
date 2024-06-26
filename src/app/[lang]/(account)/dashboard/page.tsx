import { Metadata } from "next";
import { getUser } from "@/utils/Api/api";
import { redirect } from "next/navigation";
import UserData from "./UserData";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const userData = await getUser();

  if (!userData) redirect("/");

  return (
    <div className="bg-zinc-900 min-h-screen w-full py-20">
      <h1 className=" font-nova-square text-white font-bold text-center text-5xl">Informasi Akun</h1>
      <UserData data={userData} />
    </div>
  );
}
