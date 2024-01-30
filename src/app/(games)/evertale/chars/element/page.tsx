import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import List from "@/components/Evertale/List";

export const metadata: Metadata = {
  title: "Character Element",
  description: "Evertale Character Element List",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

const element = ["water", "light", "dark", "storm", "earth"];

export default function CharElement() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <List listBy="element" subListBy="fire" type="chars" key={`element-character-fire`} limit={9} loadingAnimation textOn text="Loading..." />
      {element.map((el: string, i: number) => (
        //@ts-ignore
        <List listBy="element" subListBy={el} type="chars" key={`element-character-${i++}`} limit={9} />
      ))}
    </div>
  );
}
