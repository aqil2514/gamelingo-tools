import Character from "@/components/Game/GenshinImpact/Slider";
import DownloadButton from "@/components/general/Download";
import GameDescription from "@/components/general/GameDescription";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Genshin Impact",
  description: "Step Into a Vast Magical World of Adventure",
};

export default function GenshinImpact() {
  return (
    <div className={"main-wrapper pb-10"}>
      <div style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/Genshin-Impact/hero-section.webp')" }} className="mt-14 px-4 w-full h-[50vh] bg-no-repeat bg-cover bg-fixed bg-bottom sm:bg-top flex flex-col content-center justify-center">
        <GameDescription game="Genshin Impact" />
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          <DownloadButton game="GenshinImpact" downloadFrom="Playstore" />
          <DownloadButton game="GenshinImpact" downloadFrom="AppStore" />
          <DownloadButton game="GenshinImpact" downloadFrom="PS4" />
          <DownloadButton game="GenshinImpact" downloadFrom="Epic Games" />
        </div>
      </div>
      <div className="px-20 py-10">
      <div className="bg-slate-800 min-h-[100px] w-full">
      <Character />
      </div>

      </div>
    </div>
  );
}
