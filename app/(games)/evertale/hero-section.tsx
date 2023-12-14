"use client";
import Link from "next/link";
import Image from "next/image";
import playStoreDownload from "@/public/btn_gp_en.webp";
import appStoreDownload from "@/public/btn_ap_en.webp";

const LINK_STYLES = "mx-4 mt-4";

export default function HeroSection() {
  return (
    <div className="mt-14 w-full h-[50vh] bg-no-repeat bg-cover bg-fixed bg-bottom sm:bg-top bg-evertale-hero-pattern flex flex-col content-center justify-center">
      <h1 className="text-center text-white font-bold text-2xl sm:text-5xl font-merienda mb-2">Evertale</h1>
      <p className="text-center text-white font-bold text-sm sm:text-lg font-mclaren mb-2">Explore sprawling landscapes, bustling cities, and mythical dungeons in this expansive open-world RPG!</p>
      <div className="flex justify-center">
        <Link className={LINK_STYLES} href={"https://play.google.com/store/apps/details?id=com.zigzagame.evertale"}>
          <Image width={200} height={100} alt="Download in Playstore" src={playStoreDownload} />
        </Link>
        <Link className={LINK_STYLES} href={"https://apps.apple.com/app/evertale/id1263365153"}>
          <Image width={200} height={100} alt="Download in AppStore" src={appStoreDownload} />
        </Link>
      </div>
    </div>
  );
}
