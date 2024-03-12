import Checkbox from "@/components/Input/Checkbox";
import TextField from "@/components/Input/TextField";
import CharTeam from "./CharTeam";
import LeaderSkill from "./CharLeaderSkill";
import CharConjure from "./CharConjure";

export default function CharacterStatus() {
  return (
    <div id="character-status">
      <h5 className="text-white text-xl underline text-center font-bold font-poppins my-4">Character Status</h5>

      <TextField variant="default-variant-1" forId="charName" label="Character Name" name="status-charName" />

      <Checkbox variant="default-variant-1" forId="is-conjured-char" label="Conjured" name="status-isConjured" />

      <CharTeam template="Write" />

      <TextField variant="default-variant-1" forId="charRank" list="charRankList" label="Character Rank" name="status-charRank" />

      <TextField variant="default-variant-1" forId="charElement" label="Character Element" list="charElementList" name="status-charElement" />

      <TextField variant="default-variant-1" forId="charWeapon1" label="Character Weapon 1" list="weaponList" name="status-charWeapon1" />

      <TextField variant="default-variant-1" forId="charWeapon2" label="Character Weapon 2" list="weaponList" name="status-charWeapon2" />

      <LeaderSkill />

      <CharConjure />
    </div>
  );
}
