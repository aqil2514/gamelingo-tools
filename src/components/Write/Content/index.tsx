import { SubTemplateDataState } from "../Data";
import ArtifactForm from "./Genshin/Artifact";
import CharacterForm from "./Genshin/Character";
import Material from "./Genshin/Material";
import WeaponForm from "./Genshin/Weapon";

export default function Content({
  game,
  category,
}: {
  game: keyof SubTemplateDataState;
  category: General.Game["category"];
}) {
  if (game === "genshin-impact" && category === "Material") return <Material />;
  else if (game === "genshin-impact" && category === "Artifact")
    return <ArtifactForm />;
  else if (game === "genshin-impact" && category === "Weapon")
    return <WeaponForm />;
  else if (game === "genshin-impact" && category === "Character")
    return <CharacterForm />;
}
