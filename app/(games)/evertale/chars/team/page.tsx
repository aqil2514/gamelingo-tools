import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import List from "@/components/Evertale/List";

export const metadata: Metadata = {
  title: "Character Team",
  description: "Evertale Character Team",
};

const team = ["Burn Team", "Combo Team", "Cursed Sleep Team", "General Team", "Other Team", "Poison Team", "Sleep Team", "Stealth Team", "Stun Team", "Survivor Team"];

export default function CharTeam() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <List listBy="team" subListBy="Blood Team" type="chars" key={`character-blood-team`} limit={9} text="Loading..." textOn loadingAnimation />
      {team.map((el: string, i: number) => (
        //@ts-ignore
        <List listBy="team" subListBy={el} type="chars" key={`character-team-${i++}`} limit={9} />
      ))}
      ;
    </div>
  );
}
