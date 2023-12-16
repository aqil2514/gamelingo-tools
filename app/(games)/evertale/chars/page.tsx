import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import CharSliderSection from "../char-slider-section";
import ElementChar from "./elementChar";
import { Metadata } from "next";
import SearchInput from "../search/SearchInput";

export const metadata: Metadata = {
  title: "Characters",
};

export default function Characters() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <SearchInput />
      <CharSliderSection buttonLink={false} />
      <ElementChar />
    </div>
  );
}
