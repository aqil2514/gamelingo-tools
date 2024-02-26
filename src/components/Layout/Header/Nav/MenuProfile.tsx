import { signOut } from "next-auth/react";
import Link from "next/link";
import { Pen, PersonCircle } from "react-bootstrap-icons";

const NONACTIVE = "hidden";
const ACTIVE = "block absolute text-center min-w-[220px] top-14 right-0 bg-zinc-800 min-h-screen py-8 px-4";

export default function MenuProfile({ isActive, menu, user }: { isActive: boolean; menu: React.Ref<HTMLDivElement>; user: Account.User }) {
  return (
    <div ref={menu} className={isActive ? ACTIVE : NONACTIVE}>
      <Link href="/dashboard" className="text-white font-mclaren font-bold">
        {user?.name}
      </Link>
      <div id="shortcut" className="flex flex-row justify-center my-4 gap-4">
        {user.role === "Admin" ||
          (user.role === "General Admin" && (
            <Link href={"/admin"}>
              <PersonCircle className="bg-green-700 hover:bg-green-600 text-white text-4xl p-1 rounded" />
            </Link>
          ))}
        {user.role !== "User" && (
          <Link href={"/write"}>
            <Pen className="bg-amber-700 hover:bg-amber-600 text-white text-4xl p-1 rounded" />
          </Link>
        )}
      </div>
      <button className="bg-red-600 block my-2 mx-auto px-4 py-2 rounded-lg font-merriweather font-bold text-white" onClick={() => signOut({ callbackUrl: "/" })}>
        Logout
      </button>
    </div>
  );
}
