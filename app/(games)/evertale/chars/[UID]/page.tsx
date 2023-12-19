import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import CharBody from "./body";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Info Character",
};
export default function Character() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20"}>
      <CharBody />
    </div>
  );
}
