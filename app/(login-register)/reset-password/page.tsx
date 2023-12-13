import { Metadata } from "next";
import ResetForm from "./reset";

export const metadata: Metadata = {
  title: "Reset Password | GameLingo Tools",
};

export default function ResetPassword() {
  return (
    <div className="bg-zinc-900 min-h-screen w-full">
      <h1 className="mt-20 font-nova-square text-white font-bold text-center text-5xl">Lupa Password</h1>
      <ResetForm />
    </div>
  );
}
