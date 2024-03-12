import Form from "@/components/Input/Form";
import TextField from "@/components/Input/TextField";
import { useState } from "react";
import { charElement, charRank, charWeapon } from "@/lib/evertale/data";
import Button, { VariantClass } from "@/components/Input/Button";
import CharacterStatus from "../Components/CharacterStatus";
import CharacterImage from "../Components/CharacterImage";
import CharacterIntro from "../Components/CharacterIntro";
import CharacterProfile from "../Components/CharacterProfile";
import CharacterActiveSkill from "../Components/CharacterActiveSkill";
import CharacterPassiveSkill from "../Components/CharacterPassiveSkill";
import Navigation from "../Components/Navigation";

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

      <CharacterImage />

      <CharacterIntro />

      <CharacterProfile />

      <CharacterActiveSkill />

      <CharacterPassiveSkill />

      <Navigation template="Character" />

      <div className="w-full h-1 bg-white rounded-lg mt-4 mb-2"></div>
      <div className="w-full h-1 bg-white rounded-lg mb-4 mt-2"></div>

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
