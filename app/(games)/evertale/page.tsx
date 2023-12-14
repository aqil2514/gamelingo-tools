import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import { Metadata } from "next";
import HeroSection from "./hero-section";
import SliderSection from "./slider-section";

export const metadata: Metadata = {
  title: "Evertale",
  description: "Explore sprawling landscapes, bustling cities, and mythical dungeons in this expansive open-world RPG!",
};

export default function Evertale() {
  return (
    <div className={DIV_MAIN_STYLE}>
      <HeroSection />
      <SliderSection />
    </div>
  );
}
