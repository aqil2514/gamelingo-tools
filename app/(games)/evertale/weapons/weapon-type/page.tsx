import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import List from "@/components/Evertale/List";

export const metadata: Metadata = {
  title: "Weapon Type",
  description: "Evertale Weapons",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

export default function Characters() {
  const typeWeapon = ["Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <List listBy="type" subListBy="Sword" type="weapons" key={`weapon-team-sword`} limit={9} loadingAnimation textOn text="Loading..." />
      {typeWeapon.map((el: string, i: number) => (
        //@ts-ignore
        <List listBy="type" subListBy={el} type="weapons" key={`weapon-team-${i++}`} limit={9} />
      ))}
    </div>
  );
}
