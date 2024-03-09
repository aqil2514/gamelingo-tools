import Checkbox from "@/components/Input/Checkbox";
import TextField from "@/components/Input/TextField";
import CharTeam from "./CharTeam";
import LeaderSkill from "./CharLeaderSkill";
import CharConjure from "./CharConjure";

export default function CharacterStatus() {
  return (
    <>
      <TextField variant="default-variant-1" forId="charName" label="Character Name" name="charName" />

      <Checkbox variant="default-variant-1" forId="is-conjured-char" label="Conjured" name="isConjured" />

      <CharTeam template="Write" />

      <TextField variant="default-variant-1" forId="charRank" list="charRankList" label="Character Rank" name="charRank" />

      <TextField variant="default-variant-1" forId="charElement" label="Character Element" list="charElementList" name="charElement" />

      <TextField variant="default-variant-1" forId="charWeapon1" label="Character Weapon 1" list="weaponList" name="charWeapon1" />

      <TextField variant="default-variant-1" forId="charWeapon2" label="Character Weapon 2" list="weaponList" name="charWeapon2" />

      <LeaderSkill />

      <CharConjure />
    </>
  );
}
