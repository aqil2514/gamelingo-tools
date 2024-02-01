import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { homeIcon } from "@/components/general/Data";

export const metadata: Metadata = {
  title: "Home | GameLingo Tools",
};

export default function App() {
  return (
    <div className="min-h-screen w-full grid grid-rows-[10fr_2fr]">
      <div
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/background/hero-wallpaper.webp')" }}
        className="mt-14 flex flex-col justify-center flex-wrap content-center !bg-center !bg-cover !bg-no-repeat"
      >
        <h1 className="text-center text-white font-bold text-2xl sm:text-5xl font-merienda mb-2">Welcome to GameLingo Tools</h1>
        <h1 className="text-center text-white font-bold text-xl font-mclaren mt-2">A Tools for Gamers</h1>
      </div>
      <div className="px-4 py-2 bg-zinc-900 flex flex-row justify-center content-center flex-wrap">
        {homeIcon.map((icon) => (
          <Link key={icon.id} href={icon.url} className="group">
            <figure className="relative w-16 h-16 flex flex-col justify-between overflow-hidden rounded-full mb-4 mx-4">
              <Image fill sizes="auto" alt={icon.name} src={icon.imgLoc} className="rounded-full object-cover group-hover:scale-125 transition-all duration-500" />
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
}
