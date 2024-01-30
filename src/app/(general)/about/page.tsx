import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import Data from "./Data";

export const metadata: Metadata = {
  title: "About",
  description: "About GameLingo Tools Page",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

export default function Evertale() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-0 md:px-20"}>
      <Data />
    </div>
  );
}
