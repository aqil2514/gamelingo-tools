import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Element",
  description: "Evertale Character Element List",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

export default function CharElement() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <CharList listBy="element" loadingAnimation={true} subListBy="fire" textOn={true} text="Mengambil Data..." />
      <CharList listBy="element" loadingAnimation={false} subListBy="water" />
      <CharList listBy="element" loadingAnimation={false} subListBy="light" />
      <CharList listBy="element" loadingAnimation={false} subListBy="dark" />
      <CharList listBy="element" loadingAnimation={false} subListBy="storm" />
      <CharList listBy="element" loadingAnimation={false} subListBy="earth" />
    </div>
  );
}
