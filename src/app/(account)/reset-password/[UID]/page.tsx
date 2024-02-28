import { Metadata } from "next";
import Verify from "./verify";
import { DB, supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Reset Password",
};

interface ParamsProps {
  UID: string;
}

export default async function ResetPassword({ params }: { params: ParamsProps }) {
  const data = await supabase.from(DB.purifyPassword).select("email, createdat").eq("uid", params.UID);
  if (!data || !data.data || data.data.length === 0)
    return (
      <div className="bg-zinc-900 min-h-screen py-20 w-full">
        <h1 className="font-nova-square text-white font-bold text-center text-5xl">Link pemulihan tidak tersedia</h1>
      </div>
    );

  const email: string = data.data[0].email;

  const createdat = data.data[0].createdat;
  const currentTime = new Date();
  const createdDate = new Date(createdat + "Z");

  const currentTimeUTC = currentTime.getTime();
  const createdDateUTC = createdDate.getTime();

  if (currentTimeUTC > createdDateUTC + 5 * 60 * 1000) {
    await supabase.from(DB.purifyPassword).delete().eq("email", email);
    return (
      <div className="bg-zinc-900 min-h-screen py-20 w-full">
        <h1 className="font-nova-square text-white font-bold text-center text-5xl">Link sudah kadaluarsa</h1>
      </div>
    );
  }

  // await supabase.from(DB.purifyPassword).delete().eq("email", email);

  return (
    <div className="bg-zinc-900 min-h-screen py-20 w-full">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl">Ganti Password</h1>
      <Verify email={email} />
    </div>
  );
}
