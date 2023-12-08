import type { Metadata } from "next";
import LoginForm from "./loginform";

export const metadata: Metadata = {
  title: "Login - GameLingo Tools",
};

export default function Login() {
  return (
    <div className="bg-zinc-900 min-h-screen w-full">
      <h1 className="mt-20 font-nova-square text-white font-bold text-center text-5xl">Login Form</h1>
      <LoginForm />
    </div>
  );
}
