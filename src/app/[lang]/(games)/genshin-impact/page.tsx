import Character from "@/components/Game/GenshinImpact/List";
import DownloadButton from "@/components/general/Download";
import { Metadata } from "next";
import { Header } from "./_components";

export const metadata: Metadata = {
  title: "Genshin Impact",
  description: "Step Into a Vast Magical World of Adventure",
};

export default function GenshinImpact() {

  return (
    <div className={"main-wrapper pb-10"}>
      <Header />
      <div className="lg:px-20 md:px-10 px-4 py-10">
        <div className="bg-slate-800 min-h-[100px] w-full">
          <Character template="welcome page" />
        </div>
      </div>
    </div>
  );
}
