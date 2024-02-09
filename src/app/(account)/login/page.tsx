import type { Metadata } from "next";
import LoginForm from "./loginform";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/api";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login() {
  const user = await getUser();
  if (user) {
    redirect("/");
  }

  return (
    <div className="bg-zinc-900 min-h-screen w-full py-20">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl">Login Form</h1>
      <LoginForm />
    </div>
  );
}
