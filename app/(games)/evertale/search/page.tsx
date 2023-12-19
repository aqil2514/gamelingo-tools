import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import Main from "./main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

export default function Search() {
  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-4 md:px-8"}>
      <Main />
    </div>
  );
}
