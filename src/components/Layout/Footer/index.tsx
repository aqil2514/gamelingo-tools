"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="w-full flex flex-row justify-between h-[60px] bg-amber-600 ">
      <div className="mx-2 w-1/2 md:1/3 sm:mx-6 my-auto flex flex-row justify-start content-center">
        <ChevronLeft title="Back" onClick={() => router.back()} className="text-white mx-1 text-5xl cursor-pointer" />
        <ChevronRight title="Next" onClick={() => router.forward()} className="text-white mx-1 text-5xl cursor-pointer" />
      </div>
      <div className="hidden md:flex justify-center content-center w-1/3">
        <p className="text-center my-auto text-white font-poppins font-semibold">@GameLingo Tools 2024</p>
      </div>
      <div className="w-1/2 md:1/3 px-4 flex flex-row justify-end content-center">
        <Link className="text-white font-bold font-merienda my-auto mx-4" href={"/about"}>
          About
        </Link>
        <Link className="text-white font-bold font-merienda my-auto mx-4" href={"/new"}>
          Update
        </Link>
      </div>
    </footer>
  );
}
