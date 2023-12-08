"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu } from "./NavMenu";

export default function NavMobile({ isMobile }: { isMobile: boolean }) {
  const { data: session } = useSession();

  return (
    <>
      {isMobile && (
        <div className="absolute block right-0 bg-cyan-900 h-full pt-2 px-4">
          {session ? (
            <button className="font-bold font-roboto bg-amber-500 hover:bg-amber-200 hover:text-amber-950 px-2 py-1 rounded-lg" onClick={() => signOut({ callbackUrl: "/" })}>
              {" "}
              Sign Out
            </button>
          ) : (
            <button className="font-bold font-roboto bg-amber-500 hover:bg-amber-200 hover:text-amber-950 px-2 py-1 rounded-lg" onClick={() => signIn("google", { callbackUrl: "/admin" })}>
              {" "}
              Sign In
            </button>
          )}
          <Menu />
        </div>
      )}
    </>
  );
}
