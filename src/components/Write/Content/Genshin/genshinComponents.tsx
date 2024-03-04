import { notif } from "@/utils/fe";
import axios from "axios";
import { apiURL } from "./genshinUtils";
import React from "react";
import Button, { VariantClass } from "@/components/general/Button";

interface FetchApiProps<T> {
  elementId: string;
  msgNoInput: string;
  refElement: string;
  msgNoData: string;
  query: "characters" | "talents" | "constellations" | "artifacts" | "weapons" | "materials";
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export function FetchApi<T>({ elementId, msgNoInput, refElement, query, msgNoData, setData }: FetchApiProps<T>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [language, setLanguage] = React.useState<string>("");

  async function fetchHandler() {
    const element = document.getElementById(elementId) as HTMLInputElement;
    const charName = element.value;

    if (!charName) return notif(msgNoInput, { color: "red", refElement, location: "before" });
    try {
      setIsLoading(true);

      const res = await axios.get(`${apiURL}/${query}`, {
        params: {
          query: charName,
          resultLanguage: language,
        },
      });

      if (!res.data) {
        return notif(msgNoData, { color: "red", refElement, location: "before" });
      }

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border-2 border-white rounded-xl p-4">
      <div>
        <p className="text-white font-poppins font-bold underline my-4">Config</p>
        <p className="text-white font-poppins font-semibold">Bahasa</p>

        <input type="radio" id="Indonesia" name="result-lang" value="Indonesian" onChange={(e) => setLanguage(e.target.value)} />
        <label htmlFor="Indonesia" className="text-white font-poppins font-semibold mx-4">
          Bahasa Indonesia
        </label>

        <input type="radio" id="english" name="result-lang" value="English" onChange={(e) => setLanguage(e.target.value)} />
        <label htmlFor="english" className="text-white font-poppins font-semibold mx-4">
          English Language
        </label>
      </div>
      <Button id="fetch-data" onClick={fetchHandler} className={VariantClass.fetch} disabled={isLoading} type="button">
        {isLoading ? "Fetching Data..." : "Fetch Data"}
      </Button>
    </div>
  );
}
