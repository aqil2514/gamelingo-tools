import { useMenuContextData } from "@/components/Providers/Admin/ContextProvider";
import { MaterialDataProps } from "../MaterialData";
import React, { useEffect } from "react";

// <<<<< LOCAL COMPONENTS FOR GENSHIN IMPACT >>>>>
type LangSelectionProps = Omit<MaterialDataProps, "data">;

export const LangSelection = ({ lang, setLang }: LangSelectionProps) => {
  const { router, searchParams } = useMenuContextData();
  const field = searchParams.get("field");
  const subfield = searchParams.get("subfield");
  const langParams = searchParams.get("lang") as General.PostDocument["lang"];

  useEffect(() => {
    setLang(langParams);
  }, [langParams, setLang]);

  return (
    <>
      <div className="flex gap-2 flex-wrap content-end items-center">
        <input
          type="radio"
          name="lang"
          checked={lang === "English"}
          onChange={() => {
            router.replace(`/admin/data?field=${field}&subfield=${subfield}&lang=English`);
            setLang("English");
          }}
          id="english-lang"
        />
        <label htmlFor="english-lang" className="text-white font-bold font-poppins">
          English Data
        </label>
      </div>
      <div className="flex gap-2 flex-wrap content-end items-center">
        <input
          type="radio"
          name="lang"
          checked={lang === "Indonesian"}
          onChange={() => {
            router.replace(`/admin/data?field=${field}&subfield=${subfield}&lang=Indonesian`);
            setLang("Indonesian");
          }}
          id="indonesia-lang"
        />
        <label htmlFor="indonesia-lang" className="text-white font-bold font-poppins">
          Indonesian Data
        </label>
      </div>
    </>
  );
};
