import { DIV_MAIN_STYLE } from "@/components/Styles";
import { Metadata } from "next";
import Result from "./Result";

export const metadata: Metadata = {
  title: "Search",
};

export default function Search() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-4 md:px-8"}>
      <Result />
    </div>
  );
}
