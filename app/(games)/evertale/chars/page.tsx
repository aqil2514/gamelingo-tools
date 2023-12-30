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
      <Slider type="chars" buttonLink={false} loadingAnimation={true} length={15} textOn={false} />
      <CharList listBy="element" loadingAnimation={false} subListBy="fire" />
      <CharList listBy="element" loadingAnimation={false} subListBy="water" />
      <CharList listBy="element" loadingAnimation={false} subListBy="light" />
      <CharList listBy="element" loadingAnimation={false} subListBy="dark" />
      <CharList listBy="element" loadingAnimation={false} subListBy="storm" />
      <CharList listBy="element" loadingAnimation={false} subListBy="earth" />
    </div>
  );
}
