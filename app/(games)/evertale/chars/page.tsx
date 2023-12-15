import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import { redirect } from "next/navigation";
import CharSliderSection from "../char-slider-section";

export default function Characters() {
  return (
    <div className={DIV_MAIN_STYLE}>
      <h1 className="font-bold font-mclaren my-8 text-center text-white text-base lg:text-2xl">Evertale Character</h1>
      <CharSliderSection />
    </div>
  );
}
