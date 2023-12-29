import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import { Metadata } from "next";
import SearchInput from "@/components/general/Search/Input";
import Slider from "@/components/Evertale/Slider";
import CharList from "@/components/Evertale/CharList";

export const metadata: Metadata = {
  title: "Characters",
};

export default function Characters() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <SearchInput field="evertale" isInPage={false} />
      <Slider type="character" buttonLink={false} />
      <CharList listBy="element" subListBy="fire" />
      <CharList listBy="element" subListBy="water" />
      <CharList listBy="element" subListBy="light" />
      <CharList listBy="element" subListBy="dark" />
      <CharList listBy="element" subListBy="storm" />
      <CharList listBy="element" subListBy="earth" />
    </div>
  );
}
