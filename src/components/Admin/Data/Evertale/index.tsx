import CharacterData from "./CharacterData";
import LeaderSkillData from "./LeaderSkillData";
import PassiveSkillData from "./PassiveSkillData";
import TypeSkillData from "./TypeSkillData";
import WeaponsData from "./WeaponData";

export default function EvertaleData({
  subfield,
  data,
}: {
  subfield: string;
  data:
    | Evertale.Character.QuickInfo[]
    | Evertale.Misc.LeaderSkill[]
    | Evertale.Weapon.State[]
    | Evertale.Misc.TypeSkill[]
    | Evertale.Misc.PassiveSkill[];
}) {
  if (subfield === "chars")
    return <CharacterData data={data as Evertale.Character.QuickInfo[]} />;
  if (subfield === "leaderskills")
    return <LeaderSkillData data={data as Evertale.Misc.LeaderSkill[]} />;
  if (subfield === "weapons")
    return <WeaponsData data={data as Evertale.Weapon.State[]} />;
  if (subfield === "typeskills")
    return <TypeSkillData data={data as Evertale.Misc.TypeSkill[]} />;
    if(subfield === "passives") return <PassiveSkillData  data={data as Evertale.Misc.PassiveSkill[]}/>
  return (
    <div>
      <h1>ok</h1>
    </div>
  );
}
