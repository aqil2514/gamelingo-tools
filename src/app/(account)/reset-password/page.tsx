import { Metadata } from "next";
import ResetForm from "./reset";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassword() {
  return (
    <div className="bg-zinc-900 min-h-screen py-20 w-full">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl">Lupa Password</h1>
      <ResetForm />
    </div>
  );
}
