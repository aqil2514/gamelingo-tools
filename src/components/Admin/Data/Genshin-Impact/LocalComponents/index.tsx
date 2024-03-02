import { MaterialDataProps } from "../MaterialData";

// <<<<< LOCAL COMPONENTS FOR GENSHIN IMPACT >>>>>
type LangSelectionProps = Omit<MaterialDataProps, "data">;

export const LangSelection = ({ lang, setLang }: LangSelectionProps) => {
  return (
    <>
      <div className="flex gap-2 flex-wrap content-end items-center">
        <input type="radio" name="lang" checked={lang === "English"} onChange={() => setLang("English")} id="english-lang" />
        <label htmlFor="english-lang" className="text-white font-bold font-poppins">
          English Data
        </label>
      </div>
      <div className="flex gap-2 flex-wrap content-end items-center">
        <input type="radio" name="lang" checked={lang === "Indonesian"} onChange={() => setLang("Indonesian")} id="indonesia-lang" />
        <label htmlFor="indonesia-lang" className="text-white font-bold font-poppins">
          Indonesian Data
        </label>
      </div>
    </>
  );
};
