import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import { Metadata } from "next";
import Data from "./Data";

export const metadata: Metadata = {
  title: "What is New?",
  description: "Update Info GameLingo Tools Page",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

export default function Evertale() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-0 md:px-20"}>
      <Data />
    </div>
  );
}
