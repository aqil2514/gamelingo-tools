import { signOut } from "next-auth/react";
import Link from "next/link";

const NONACTIVE = "hidden";
const ACTIVE = "block absolute text-center min-w-[220px] top-14 right-0 bg-zinc-800 min-h-screen py-8 px-4";

export default function MenuProfile({ isActive, menu, user }: { isActive: boolean; menu: React.Ref<HTMLDivElement>; user: Account.User }) {
  return (
    <div ref={menu} className={isActive ? ACTIVE : NONACTIVE}>
      <Link href="/dashboard" className="text-white font-mclaren font-bold">
        {user?.name}
      </Link>
      <button className="bg-red-600 block my-2 mx-auto px-4 py-2 rounded-lg font-merriweather font-bold text-white" onClick={() => signOut({ callbackUrl: "/" })}>
        Logout
      </button>
    </div>
  );
}
