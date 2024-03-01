import CharacterData from "./CharacterData";
import LeaderSkillData from "./LeaderSkillData";
import PassiveSkillData from "./PassiveSkillData";
import TypeSkillData from "./TypeSkillData";
import WeaponsData from "./WeaponData";

interface EvertaleDataProps {
  subfield: string;
  data: any;
}

export default function EvertaleData({ subfield, data }: EvertaleDataProps) {
  if (subfield === "chars") return <CharacterData data={data as Evertale.Character.QuickInfo[]} />;
  if (subfield === "leaderskills") return <LeaderSkillData data={data as Evertale.Misc.LeaderSkill[]} />;
  if (subfield === "weapons") return <WeaponsData data={data as Evertale.Weapon.State[]} />;
  if (subfield === "typeskills") return <TypeSkillData data={data as Evertale.Misc.TypeSkill[]} />;
  if (subfield === "passives") return <PassiveSkillData data={data as Evertale.Misc.PassiveSkill[]} />;
}
