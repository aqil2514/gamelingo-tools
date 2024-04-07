"use client";
import { homeIcon } from "@/lib/Data";
import { Link } from "@/navigation";
import Image from "next/image";
import { useState } from "react";

export default function HomeIcon() {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div className="bg-zinc-900 px-4 py-2 ">
    <div className="flex flex-row justify-center content-center flex-wrap">
      {homeIcon.map((icon) => (
        <Link key={icon.id} href={icon.url} className="group">
          <figure className="relative w-16 h-16 flex flex-col justify-between overflow-hidden rounded-full mb-4 mx-4">
            <Image
              fill
              sizes="auto"
              alt={icon.name}
              src={icon.imgLoc}
              className="rounded-full object-cover group-hover:scale-125 transition-all duration-500"
              onClick={() => setIsActive(true)}
            />
          </figure>
        </Link>
      ))}
    </div>
      {isActive && <p className="font-poppins text-white font-bold text-center">Memuat Halaman...</p>}
    </div>
  );
}
