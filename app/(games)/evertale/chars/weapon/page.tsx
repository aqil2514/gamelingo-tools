import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Weapons",
  description: "Evertale Character List Sort by Weapon",
};

export default function CharElement() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <CharList listBy="weapon" loadingAnimation={true} subListBy="Axe" textOn text="Mengambil Data..." />
      <CharList listBy="weapon" loadingAnimation={false} subListBy="GreatAxe" />
      <CharList listBy="weapon" loadingAnimation={false} subListBy="GreatSword" />
      <CharList listBy="weapon" loadingAnimation={false} subListBy="Hammer" />
      <CharList listBy="weapon" loadingAnimation={false} subListBy="Katana" />
      <CharList listBy="weapon" loadingAnimation={false} subListBy="Mace" />
      <CharList listBy="weapon" loadingAnimation={false} subListBy="Spear" />
      <CharList listBy="weapon" loadingAnimation={false} subListBy="Staff" />
      <CharList listBy="weapon" loadingAnimation={false} subListBy="Sword" />
    </div>
  );
}
