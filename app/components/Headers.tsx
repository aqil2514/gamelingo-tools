"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Headers() {
  const router = useRouter();
  const pathName = usePathname();
  const session = useSession();
  const user = session?.data?.user;

  if (!user) {
    return (
      <nav className="w-full flex flex-row justify-between fixed top-0 h-[60px] bg-emerald-700">
        <div className="mx-2 sm:mx-6 my-auto ">
          <h1 className="text-white text-xl sm:text-2xl font-merriweather cursor-pointer" onClick={() => router.push("/")}>
            GameLingo Tools
          </h1>
        </div>
        {pathName !== "/login" && pathName !== "/register" && (
          <div className="mx-2 sm:mx-6 my-auto">
            <Link href="/login" className="cursor-pointer">
              <button className="bg-yellow-400 font-poppins font-bold text-yellow-950 text-xs sm:text-lg py-1 px-2 mx-1 rounded-lg">Login</button>
            </Link>
            <Link href="/register" className="cursor-pointer">
              <button className="bg-yellow-400 font-poppins font-bold text-yellow-950 text-xs sm:text-lg py-1 px-2 mx-1 rounded-lg">Register</button>
            </Link>
          </div>
        )}
      </nav>
    );
  }
  return (
    <nav className="w-full flex flex-row justify-between fixed top-0 h-[60px] bg-emerald-700">
      <div className="mx-2 sm:mx-6 my-auto ">
        <h1 className="text-white text-xl sm:text-2xl font-merriweather cursor-pointer" onClick={() => router.push("/")}>
          GameLingo Tools
        </h1>
      </div>

      <div className="mx-2 sm:mx-6 my-auto">
        <SessionNav user={user} />
      </div>
    </nav>
  );
}

function SessionNav({ user }: { user: any }) {
  const [isActive, setIsActive] = useState<true | false>(false);
  const menu = useRef<HTMLDivElement>(null);

  function clickHandler() {
    setIsActive(!isActive);
  }
  return (
    <>
      <div>
        <Image className="rounded-full cursor-pointer" onClick={clickHandler} quality={50} src={user.image || "https://i.imgur.com/A28Nksb.png"} alt="image-user" height={32} width={32} />
      </div>
      <MenuProfile isActive={isActive} menu={menu} user={user} />
    </>
  );
}

const NONACTIVE = "hidden";
const ACTIVE = "block absolute text-right top-14 right-0 bg-emerald-700 min-h-screen py-8 px-4";

function MenuProfile({ isActive, menu, user }: { isActive: true | false; menu: React.Ref<HTMLDivElement>; user: any }) {
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
