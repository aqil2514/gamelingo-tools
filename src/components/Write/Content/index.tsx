import { SubTemplateDataState } from "../Data";
import Material from "./Genshin/Material";

export default function Content({game, category}:{game:keyof SubTemplateDataState; category:string}){
if(game === "genshin-impact" && category ==="Material") return <Material />
}