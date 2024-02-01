import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "./registerform";
RegisterForm;

export const metadata: Metadata = {
  title: "Register",
};

export default async function Login() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="bg-zinc-900 min-h-screen w-full pt-20 pb-10">
      <h1 className="font-nova-square text-white font-bold mb-4 text-center text-5xl">Register Form</h1>
      <RegisterForm />
    </div>
  );
}
