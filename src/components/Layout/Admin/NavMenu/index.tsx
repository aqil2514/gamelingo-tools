"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const LINKSTYLE: string = "";

export default function NavMenu() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const field = searchParams.get("field") as string;
  return (
    <div className="min-h-screen bg-zinc-800 py-20 px-2">
      <h1 className="text-white font-merriweather font-bold text-2xl text-center mb-4">Menu</h1>
      <details className="px-1" open={pathName === "/admin/data"}>
        <summary className="text-white font-mclaren font-semibold text-xl">Data</summary>
        <details className="px-2" open={field === "account"}>
          <summary className="text-white font-mclaren font-semibold text-lg">Account</summary>
          <div className="px-4 flex flex-col">
            <Link
              href={`/admin/data?field=account&subfield=userslogin`}
              className="text-white font-semibold text-base after:content-[''] after:w-0 after:bg-white after:transition after:duration-500 hover:after:w-full block after:block after:h-1"
            >
              User
            </Link>
            <Link href={`/admin/data?field=account&subfield=password_purify`} className="text-white font-semibold text-base">
              Password Purify
            </Link>
            <Link href={`/admin/data?field=account&subfield=verifcode`} className="text-white font-semibold text-base">
              Verification Code
            </Link>
          </div>
        </details>
        <details className="px-2" open={field === "evertale"}>
          <summary className="text-white font-mclaren font-semibold text-lg">Evertale</summary>
          <div className="px-4 flex flex-col">
            <Link href={`/admin/data?field=evertale&subfield=chars`} className="text-white font-semibold text-base">
              Characters
            </Link>
            <Link href={`/admin/data?field=evertale&subfield=leaderskills`} className="text-white font-semibold text-base">
              Leader Skill
            </Link>
            <Link href={`/admin/data?field=evertale&subfield=passives`} className="text-white font-semibold text-base">
              Passive Skill
            </Link>
            <Link href={`/admin/data?field=evertale&subfield=typeskills`} className="text-white font-semibold text-base">
              Type Skills
            </Link>
            <Link href={`/admin/data?field=evertale&subfield=weapons`} className="text-white font-semibold text-base">
              Weapons
            </Link>
          </div>
        </details>
      </details>
    </div>
  );
}
