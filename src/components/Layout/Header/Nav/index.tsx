"use client";

import AccountManage from "./AccountManage";
import SessionNav from "./SessionNav";
import { Link } from "@/navigation";

export default function Navbar({ data }: { data: Account.User | null }) {
  return (
    <nav
      style={{ zIndex: "999" }}
      className="w-full flex flex-row justify-between fixed top-0 h-[60px] bg-zinc-800 "
    >
      <div className="mx-2 sm:mx-6 my-auto ">
        <Link
          className="text-white text-xl sm:text-2xl font-merriweather cursor-pointer"
          href={"/"}
        >
          GameLingo Tools
        </Link>
      </div>

      {data ? <SessionNav user={data} /> : <AccountManage />}
    </nav>
  );
}
