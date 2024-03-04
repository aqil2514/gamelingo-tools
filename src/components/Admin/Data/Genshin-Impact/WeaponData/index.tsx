import React from "react";
import ContextProvider from "../../../../Providers/Admin/ContextProvider";
import WeaponDataTable from "./WeaponData";

export interface WeaponDataProps {
  data: GenshinImpact.WeaponTable[];
  lang: General.PostDocument["lang"];
  setLang: React.Dispatch<React.SetStateAction<General.PostDocument["lang"]>>;
}

export default function MaterialData({ data, lang, setLang }: WeaponDataProps) {
  return (
    <ContextProvider>
      <WeaponDataTable data={data} lang={lang} setLang={setLang} />
    </ContextProvider>
  );
}
