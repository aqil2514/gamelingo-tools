import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import Slider from "@/components/Evertale/Slider";
import GameDescription from "@/components/general/GameDescription";
import DownloadButton from "@/components/general/Download";

export const metadata: Metadata = {
  title: "Evertale",
  description: "Explore sprawling landscapes, bustling cities, and mythical dungeons in this expansive open-world RPG!",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

export default function Evertale() {
  return (
    <div className={DIV_MAIN_STYLE + " pb-10"}>
      <div className="mt-14 px-4 w-full h-[50vh] bg-no-repeat bg-cover bg-fixed bg-bottom sm:bg-top bg-evertale-hero-pattern flex flex-col content-center justify-center">
        <GameDescription game="Evertale" />
        <div className="flex justify-center">
          <DownloadButton game="Evertale" downloadFrom="Playstore" />
          <DownloadButton game="Evertale" downloadFrom="AppStore" />
        </div>
      </div>
      <Slider type="chars" buttonLink={true} loadingAnimation={true} textOn={true} text="Mohon tunggu..." length={15} />
      <Slider type="weapons" buttonLink={true} loadingAnimation={false} textOn={false} length={15} />
    </div>
  );
}
