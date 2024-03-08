import Checkbox from "@/components/Input/Checkbox";
import Form from "@/components/Input/Form";
import TextField from "@/components/Input/TextField";
import { SetStateAction, useState } from "react";
import CharTeam from "../Components/CharTeam";
import { charElement, charRank, charWeapon } from "@/lib/evertale/data";
import LeaderSkill from "../Components/CharLeaderSkill";

interface EvertaleCharacterFormProps {
  template: "Write" | "Edit";
}
export default function EvertaleCharacterForm({
  template,
}: EvertaleCharacterFormProps) {
  if (template === "Write") return <WriteContent />;
}

function WriteContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Form
      setIsLoading={setIsLoading}
      method={"postForm"}
      endPoint={"/api/post"}
      refElement="test"
      game="Evertale"
      category="Character"
    >
      <TextField variant="hidden" name="game" defaultValue={"Evertale"} />

      <TextField variant="hidden" name="category" defaultValue={"chars"} />

      <TextField
        variant="default-variant-1"
        forId="charName"
        label="Character Name"
        name="charName"
      />

      <CharTeam template="Write" />

      <TextField
        variant="default-variant-1"
        forId="charRank"
        list="charRankList"
        label="Character Rank"
        name="charRank"
      />

      <TextField
        variant="default-variant-1"
        forId="charElement"
        label="Character Element"
        list="charElementList"
        name="charElement"
      />

      <TextField
        variant="default-variant-1"
        forId="charWeapon1"
        label="Character Weapon 1"
        list="weaponList"
        name="charWeapon1"
      />

      <TextField
        variant="default-variant-1"
        forId="charWeapon2"
        label="Character Weapon 2"
        list="weaponList"
        name="charWeapon2"
      />

      <LeaderSkill />
      <Checkbox
        variant="default-variant-1"
        forId="is-conjured-char"
        label="Conjured"
        name="isConjured"
      />

      <TextField
        variant="default-variant-1"
        forId="charConjure"
        label="Character Conjure"
        name="charConjure"
      />
      <button id="test">{isLoading ? "Sending" : "test"}</button>

      <datalist id="charRankList">
        {charRank.map((rank) => (
          <option value={rank.rank} key={rank.rank} />
        ))}
      </datalist>

      <datalist id="charElementList">
        {charElement.map((element) => (
          <option value={element.element} key={element.element} />
        ))}
      </datalist>

      <datalist id="weaponList">
        {charWeapon.map((weapon) => (
          <option value={weapon.name} key={weapon.name} />
        ))}
      </datalist>
    </Form>
  );
}
