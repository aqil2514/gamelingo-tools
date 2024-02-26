import { getServerSession } from "next-auth";
import Verification from "@/components/Account/Verification";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { DB, supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Account Verification",
};

type ParamsProp = { params: { UID: string } };

export default async function Verify({ params }: ParamsProp) {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  const { UID } = params;

  const verification = await supabase.from(DB.code).select("*").like("uid", UID);

  if (!verification || !verification.data || verification.data?.length === 0) {
    alert("Tidak ada data tersebut");
    redirect("/login");
  }

  const data: Account.VerifCode = verification?.data[0];

  return (
    <div className="bg-zinc-900 min-h-screen w-full py-20">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl">Verifikasi Akun</h1>
      <Verification initData={data} />
    </div>
  );
}
