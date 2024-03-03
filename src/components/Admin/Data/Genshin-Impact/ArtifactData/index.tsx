import React from "react";
import ContextProvider from "../../../ContextMenu/ContextProvider";
import ArtifactDataTable from "./ArtifactData";

export interface ArtifactDataProps {
  data: GenshinImpact.ArtifactTable[];
  lang: General.PostDocument["lang"];
  setLang: React.Dispatch<React.SetStateAction<General.PostDocument["lang"]>>;
}

export default function ArtifactData({ data, lang, setLang }: ArtifactDataProps) {
  return (
    <ContextProvider>
      <ArtifactDataTable data={data} lang={lang} setLang={setLang} />
    </ContextProvider>
  );
}
