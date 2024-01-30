import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | GameLingo Tools",
};

const LINK_STYLE = "bg-sky-700 h-3/5 sm:my-none my-4 px-4 rounded-[32px] text-center text-white sm:text-2xl text-lg font-poppins";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <div className="mt-14 w-full h-4/5 bg-no-repeat bg-cover bg-left sm:bg-top bg-hero-pattern flex flex-col content-center justify-center">
        <h1 className="text-center text-white font-bold text-2xl sm:text-5xl font-merienda mb-2">Welcome to GameLingo Tools</h1>
        <h1 className="text-center text-white font-bold text-xl font-mclaren mt-2">A Tools for Gamers</h1>
      </div>
      <div className="flex sm:flex-row flex-col justify-between content-center px-10 pt-10 pb-10 sm:pb-auto min-h-1/5 bg-zinc-900">
        <Link href="/genshin-impact" className={LINK_STYLE}>
          Genshin Impact
        </Link>
        <Link href="/evertale" className={LINK_STYLE}>
          Evertale
        </Link>
        <Link href="/mlbb" className={LINK_STYLE}>
          Mobile Legends
        </Link>
      </div>
    </div>
  );
}
