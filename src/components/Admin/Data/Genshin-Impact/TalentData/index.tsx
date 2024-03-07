import ContextProvider from "@/components/Providers/Admin/ContextProvider";
import TalentDataTable from "./TalentData";

export interface TalentDataProps {
  data: GenshinImpact.TalentTable[];
  lang: General.PostDocument["lang"];
  setLang: React.Dispatch<React.SetStateAction<General.PostDocument["lang"]>>;
}

export default function TalentData({ data, lang, setLang }: TalentDataProps) {
  return (
    <ContextProvider>
      <TalentDataTable data={data} lang={lang} setLang={setLang} />
    </ContextProvider>
  );
}
