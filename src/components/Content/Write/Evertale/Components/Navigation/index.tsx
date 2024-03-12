import { ChevronDoubleRight } from "react-bootstrap-icons";

interface NavigationProps {
  template: "Character" | "Weapon";
}

const NONACTIVE_NAV_LIST = "font-bold font-poppins text-white hover:bg-white hover:text-zinc-800 transition duration-200 cursor-pointer px-2 my-4 rounded-lg";
const ACTIVE_NAV_LIST = "font-bold font-poppins bg-white text-zinc-800 transition duration-200 cursor-pointer px-2 my-4 rounded-lg";

export default function Navigation({ template }: NavigationProps) {
  if (template === "Character") return <NavigationCharacter />;
}

function NavigationCharacter() {
  return (
    <div className="min-h-full bg-zinc-800 fixed top-0 left-[-20%] min-w-[200px] p-4">
      <p className={NONACTIVE_NAV_LIST}>Character Status</p>
      <p className={NONACTIVE_NAV_LIST}>Character Image</p>
      <p className={NONACTIVE_NAV_LIST}>Character Intro</p>
      <p className={NONACTIVE_NAV_LIST}>Character Profile</p>
      <p className={NONACTIVE_NAV_LIST}>Character Active Skill</p>
      <p className={NONACTIVE_NAV_LIST}>Character Passive Skill</p>
      <ChevronDoubleRight className="bi bi-chevron-double-right absolute right-[-32px] top-[45%] bg-zinc-800 text-white text-[2rem] rounded-[0_1rem_1rem_0] cursor-pointer hover:bg-white hover:text-zinc-800 transition duration-200" />
    </div>
  );
}
