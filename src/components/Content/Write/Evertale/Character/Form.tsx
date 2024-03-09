import Checkbox from "@/components/Input/Checkbox";
import Form from "@/components/Input/Form";
import TextField from "@/components/Input/TextField";
import { useState } from "react";
import CharTeam from "../Components/CharacterStatus/CharTeam";
import { charElement, charRank, charWeapon } from "@/lib/evertale/data";
import LeaderSkill from "../Components/CharacterStatus/CharLeaderSkill";
import CharConjure from "../Components/CharacterStatus/CharConjure";
import Button, { VariantClass } from "@/components/Input/Button";
import CharacterStatus from "../Components/CharacterStatus";

interface EvertaleCharacterFormProps {
  template: "Write" | "Edit";
}
export default function EvertaleCharacterForm({ template }: EvertaleCharacterFormProps) {
  if (template === "Write") return <WriteContent />;
}

function WriteContent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Form setIsLoading={setIsLoading} method={"postForm"} endPoint={"/api/post"} refElement="test" game="Evertale" category="Character">
      {/* Info for API */}
      <>
        <TextField variant="hidden" name="game" defaultValue={"Evertale"} />

        <TextField variant="hidden" name="category" defaultValue={"chars"} />
      </>

      <CharacterStatus />

      <Button className={VariantClass.submit} id="test">
        {isLoading ? "Sending..." : "Send"}
      </Button>

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
