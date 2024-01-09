import { DIV_MAIN_STYLE } from "@/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";
import List from "@/components/Evertale/List";

export const metadata: Metadata = {
  title: "Character Weapons",
  description: "Evertale Character List Sort by Weapon",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

const weapon = ["Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

export default function CharElement() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <List listBy="weapon" subListBy="Sword" type="chars" key={`weapon-team-sword`} limit={9} loadingAnimation textOn text="Loading..." />
      {weapon.map((el: string, i: number) => (
        //@ts-ignore
        <List listBy="weapon" subListBy={el} type="chars" key={`weapon-team-${i++}`} limit={9} />
      ))}
    </div>
  );
}
