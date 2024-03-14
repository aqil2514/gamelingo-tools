import EvertaleFormCharacterNavigation from "./Evertale/FormCharacter";
import EvertalePage from "./Evertale/Page";

interface NavigationProps {
  template: "Evertale-Form-Character" | "Evertale-Form-Weapon" | "Evertale-Page";
}

export const NONACTIVE_NAV_LIST = "font-bold font-poppins text-white hover:bg-white hover:text-zinc-800 transition duration-200 cursor-pointer px-2 my-4 rounded-lg";
export const ACTIVE_NAV_LIST = "font-bold font-poppins text-zinc-800 bg-white cursor-default px-2 my-4 rounded-lg";

export default function Navigation({ template }: NavigationProps) {
  if (template === "Evertale-Form-Character") return <EvertaleFormCharacterNavigation />;
  if(template === "Evertale-Page") return <EvertalePage />
}

