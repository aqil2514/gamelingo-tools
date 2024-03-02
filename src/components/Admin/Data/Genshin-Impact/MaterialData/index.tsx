import React from "react";
import ContextProvider from "../../../ContextMenu/ContextProvider";
import MaterialDataTable from "./MaterialData";

export interface MaterialDataProps {
  data: GenshinImpact.MaterialTable[];
  lang: General.PostDocument["lang"];
  setLang: React.Dispatch<React.SetStateAction<General.PostDocument["lang"]>>;
}

export default function MaterialData({ data, lang, setLang }: MaterialDataProps) {
  return (
    <ContextProvider>
      <MaterialDataTable data={data} lang={lang} setLang={setLang} />
    </ContextProvider>
  );
}
