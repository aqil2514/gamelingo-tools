import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import CharSliderSection from "../char-slider-section";
import ElementChar from "./elementChar";

export default function Characters() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20"}>
      <CharSliderSection buttonLink={false} />
      <ElementChar />
    </div>
  );
}
