import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import WeapList from "@/components/Evertale/WeapList";

export const metadata: Metadata = {
  title: "Weapon Type",
  description: "Evertale Weapons",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

export default function Characters() {
  const typeWeapon = ["Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <WeapList listBy="type" subListBy="Sword" isGrid loadingAnimation textOn text="Loading Data..." />
      {typeWeapon.map((weapon: string, i: number) => (
        <div key={`weapon-${i++}`}>
          <WeapList listBy="type" subListBy={weapon} isGrid />
        </div>
      ))}
    </div>
  );
}
