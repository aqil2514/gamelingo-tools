import { Metadata } from "next";
import SearchInput from "@/components/general/Search/Input";
import Slider from "@/components/Game/Evertale/Slider";
import WeaponList from "./Weapons";

export const metadata: Metadata = {
  title: "Weapons",
  description: "Evertale Weapons",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

export default function Characters() {
  return (
    <div className={"main-wrapper py-20 px-8"}>
      <Slider type="weapons" buttonLink={false} loadingAnimation={true} length={15} textOn={false} />
      <WeaponList />
    </div>
  );
}
