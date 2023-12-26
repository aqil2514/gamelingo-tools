import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import { Metadata } from "next";
import Data from "./Data";

export const metadata: Metadata = {
  title: "About",
};

export default function Evertale() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-20"}>
      <Data />
    </div>
  );
}
