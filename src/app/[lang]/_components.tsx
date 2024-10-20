"use client";
import { homeIcon } from "@/lib/Data";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HomeIcon() {
  return (
    <div className="bg-zinc-900 px-4 py-2 content-center">
      <div className="flex justify-center">
        {homeIcon.map((icon) => (
          <Link key={icon.id} href={icon.url} className="group ">
            <figure className="relative w-16 h-16 flex flex-col justify-between overflow-hidden rounded-full mb-4 mx-4">
              <Image
                fill
                sizes="auto"
                alt={icon.name}
                src={icon.imgLoc}
                className="rounded-full object-cover group-hover:scale-125 transition-all duration-500"
              />
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function HomeIntro() {
  const t = useTranslations("Home");

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/background/hero-wallpaper.webp')",
      }}
      className="mt-14 flex flex-col justify-center flex-wrap content-center !bg-center !bg-cover !bg-no-repeat"
    >
      <h1 className="text-center text-white font-bold text-base sm:text-5xl font-merienda mb-2">
        {t("greetings")}
      </h1>
      <h1 className="text-center text-white font-bold text-xs font-mclaren mt-2">
        {t("sub")}
      </h1>
    </div>
  );
}
