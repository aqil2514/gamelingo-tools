import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import { Metadata } from "next";
import HeroSection from "./hero-section";
import SliderSection from "./char-slider-section";
import CharSliderSection from "./char-slider-section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Evertale",
  description: "Explore sprawling landscapes, bustling cities, and mythical dungeons in this expansive open-world RPG!",
};

export default function Evertale() {
  return (
    <div className={DIV_MAIN_STYLE + " pb-10"}>
      <HeroSection />
      <h1 className="font-bold font-mclaren my-8 text-center text-white text-base lg:text-2xl">Evertale Character</h1>
      <CharSliderSection />
      <Link href="/evertale/chars">
        <button className="block mx-auto text-center font-mclaren text-slate-200 bg-yellow-600 px-4 py-2">Lihat lebih banyak &rarr;</button>
      </Link>
    </div>
  );
}
