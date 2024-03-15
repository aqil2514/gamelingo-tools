import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { homeIcon } from "@/lib/Data";
import HomeIcon from "@/components/Layout/Home/Icon";

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
      <HomeIcon />
    </div>
  );
}
