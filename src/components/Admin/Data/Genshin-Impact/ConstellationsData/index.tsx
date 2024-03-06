import ContextProvider from "@/components/Providers/Admin/ContextProvider";
import ConstellationsDataTable from "./ConstellationsData";

export interface ConstellationsDataProps {
  data: GenshinImpact.ConstellationTable[];
  lang: General.PostDocument["lang"];
  setLang: React.Dispatch<React.SetStateAction<General.PostDocument["lang"]>>;
}

export default function ConstellationsData({ data, lang, setLang }: ConstellationsDataProps) {
  return (
    <ContextProvider>
      <ConstellationsDataTable data={data} lang={lang} setLang={setLang} />
    </ContextProvider>
  );
}
