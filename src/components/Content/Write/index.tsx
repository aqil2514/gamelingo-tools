import { SubTemplateDataState } from "./Misc/Data";
import ArtifactForm from "./Genshin/Artifact";
import CharacterForm from "./Genshin/Character";
import ConstellationsForm from "./Genshin/Constellations";
import Material from "./Genshin/Material";
import TalentForm from "./Genshin/Talent";
import WeaponForm from "./Genshin/Weapon";

export default function Content({ game, category }: { game: keyof SubTemplateDataState; category: General.Game["category"] }) {
  if (game === "genshin-impact" && category === "Material") return <Material />;
  else if (game === "genshin-impact" && category === "Artifact") return <ArtifactForm />;
  else if (game === "genshin-impact" && category === "Weapon") return <WeaponForm />;
  else if (game === "genshin-impact" && category === "Character") return <CharacterForm />;
  else if (game === "genshin-impact" && category === "Talent") return <TalentForm />;
  else if (game === "genshin-impact" && category === "Constellations") return <ConstellationsForm />;
}
