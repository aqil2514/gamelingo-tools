import CharacterData from "./CharacterData";
import LeaderSkillData from "./LeaderSkillData";
import PassiveSkillData from "./PassiveSkillData";
import TypeSkillData from "./TypeSkillData";
import WeaponsData from "./WeaponData";
import { getClientUser } from "@/utils/fe";

interface EvertaleDataProps {
  subfield: string;
  data: any;
}

export default function EvertaleData({ subfield, data }: EvertaleDataProps) {
  const user = getClientUser();

  if (user.role !== "Admin of Evertale" && user.role !== "General Admin") return <p className="text-white mx-4 font-poppins font-bold">Maaf, anda belum mendapat izin untuk melihat data game ini</p>;

  if (subfield === "chars") return <CharacterData data={data as Evertale.Character.QuickInfo[]} />;
  if (subfield === "leaderskills") return <LeaderSkillData data={data as Evertale.Misc.LeaderSkill[]} />;
  if (subfield === "weapons") return <WeaponsData data={data as Evertale.Weapon.State[]} />;
  if (subfield === "typeskills") return <TypeSkillData data={data as Evertale.Misc.TypeSkill[]} />;
  if (subfield === "passives") return <PassiveSkillData data={data as Evertale.Misc.PassiveSkill[]} />;
}
