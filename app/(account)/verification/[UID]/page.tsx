import { getServerSession } from "next-auth";
import Verification from "./verif";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account Verification",
};

export default async function Verify() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return (
    <div className="bg-zinc-900 min-h-screen w-full pb-10">
      <h1 className="mt-20 font-nova-square text-white font-bold text-center text-5xl">Verifikasi Akun</h1>
      <Verification />
    </div>
  );
}
