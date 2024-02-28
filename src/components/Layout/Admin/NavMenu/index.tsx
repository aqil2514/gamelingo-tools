"use client";
import { usePathname, useSearchParams } from "next/navigation";
import AccountLink from "./AccountLink";
import EvertaleLink from "./EvertaleLink";

export enum LINKSTYLE {
  NONACTIVE_LINK = "text-white font-semibold text-base block hover:bg-white hover:text-zinc-800 px-2 rounded-[0_1rem_1rem_0] transition duration-200 my-2 cursor-pointer",
  ACTIVE_LINK = "font-semibold text-base block cursor-default bg-white text-zinc-800 px-2 rounded-[0_1rem_1rem_0] transition duration-200 my-2",
}

export default function NavMenu({ user }: { user: Account.User }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const field = searchParams.get("field") as string;
  const subfield = searchParams.get("subfield") as string;

  return (
    <div className="min-h-screen bg-zinc-800 py-20 px-2">
      <h1 className="text-white font-merriweather font-bold text-2xl text-center mb-4">Menu</h1>
      <details className="px-1" open={pathName === "/admin/data"}>
        <summary className="text-white font-mclaren font-semibold text-xl">Data</summary>

        {user.role === "General Admin" && <AccountLink field={field} subfield={subfield} />}

        <EvertaleLink field={field} subfield={subfield} />
      </details>
    </div>
  );
}
