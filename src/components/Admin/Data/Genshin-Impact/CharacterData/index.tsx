import React from "react";
import ContextProvider from "../../../../Providers/Admin/ContextProvider";
import CharacterDataTable from "./CharacterData";

export interface CharacterDataProps {
  data: GenshinImpact.CharacterTable[];
  lang: General.PostDocument["lang"];
  setLang: React.Dispatch<React.SetStateAction<General.PostDocument["lang"]>>;
}

export default function CharacterData({ data, lang, setLang }: CharacterDataProps) {
  return (
    <ContextProvider>
      <CharacterDataTable data={data} lang={lang} setLang={setLang} />
    </ContextProvider>
  );
}
