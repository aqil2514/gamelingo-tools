"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Headers() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <nav className="w-full flex flex-row justify-between fixed top-0 h-[60px] bg-emerald-700">
      <div className="mx-6 my-auto ">
        <h1 className="text-white text-xl sm:text-2xl font-merriweather cursor-pointer" onClick={() => router.push("/")}>
          GameLingo Tools
        </h1>
      </div>
      {pathName !== "/login" && pathName !== "/register" && (
        <div className="mx-6 my-auto">
          <Link href="/login" className="cursor-pointer">
            <button className="bg-yellow-400 font-poppins font-bold text-yellow-950 text-sm sm:text-lg py-1 px-2 mx-2 rounded-lg">Login</button>
          </Link>
          <Link href="/register" className="cursor-pointer">
            <button className="bg-yellow-400 font-poppins font-bold text-yellow-950 text-sm sm:text-lg py-1 px-2 mx-2 rounded-lg">Register</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
