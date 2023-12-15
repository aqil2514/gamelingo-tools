import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import { Metadata } from "next";
import HeroSection from "./hero-section";
import CharSliderSection from "./char-slider-section";

export const metadata: Metadata = {
  title: "Evertale",
  description: "Explore sprawling landscapes, bustling cities, and mythical dungeons in this expansive open-world RPG!",
};

export default function Evertale() {
  return (
    <div className={DIV_MAIN_STYLE + " pb-10"}>
      <HeroSection />
      <CharSliderSection buttonLink={true} />
    </div>
  );
}
