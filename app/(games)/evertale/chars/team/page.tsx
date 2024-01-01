import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import CharList from "@/components/Evertale/CharList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character Team",
  description: "Evertale Character Team",
};

export default function CharTeam() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <CharList listBy={"team"} loadingAnimation={true} text="Mengambil Data..." textOn={true} subListBy="Blood Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Burn Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Combo Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Cursed Sleep Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="General Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Other Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Poison Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Sleep Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Stealth Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Stun Team" />
      <CharList listBy={"team"} loadingAnimation={false} subListBy="Survivor Team" />
    </div>
  );
}
