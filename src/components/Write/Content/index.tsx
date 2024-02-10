import { SubTemplateDataState } from "../Data";
import ArtifactForm from "./Genshin/Artifact";
import Material from "./Genshin/Material";

export default function Content({game, category}:{game:keyof SubTemplateDataState; category:General.Game["category"]}){
if(game === "genshin-impact" && category ==="Material") return <Material />
if(game==="genshin-impact" && category === "Artifact") return <ArtifactForm />
}