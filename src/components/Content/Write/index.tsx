import { SubTemplateDataState } from "../Misc/Data";
import ArtifactForm from "./Genshin/Artifact";
import CharacterForm from "./Genshin/Character";
import ConstellationsForm from "./Genshin/Constellations";
import Material from "./Genshin/Material";
import TalentForm from "./Genshin/Talent";
import WeaponForm from "./Genshin/Weapon";
import EvertaleCharacterContentForm from "./Evertale/Character";

function isEvertale(category:any): category is General.GameEvertale["category"]{
  return category
}
function isGenshinImpact(category:any): category is General.GameGenshinImpact["category"]{
  return category
}

export default function Content({ game, category }: { game: keyof SubTemplateDataState; category: General.Game["category"] }) {
  if(game === "genshin-impact" && isGenshinImpact(category)){
    if (category === "Material") return <Material />;
    else if (category === "Artifact") return <ArtifactForm />;
    else if (category === "Weapon") return <WeaponForm />;
    else if (category === "Character") return <CharacterForm />;
    else if (category === "Talent") return <TalentForm />;
    else if (category === "Constellations") return <ConstellationsForm />;
  }
  if(game === "evertale" && isEvertale(category)){
    if(category === "Character") return <EvertaleCharacterContentForm />
  }
}
