import type { Metadata } from "next";
import LoginForm from "./loginform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="bg-zinc-900 min-h-screen w-full py-20">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl">Login Form</h1>
      <LoginForm />
    </div>
  );
}
