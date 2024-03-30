"use client";
import Button, { VariantClass } from "@/components/Input/Button";
import Select from "@/components/Input/Select";
import TextField from "@/components/Input/TextField";
import { fetcherWithParams } from "@/lib/Data";
import { Route } from "next";
import { useState } from "react";
import useSWR from "swr";
import Form from "./Form";

interface GenshinCharacterEditProps {
  searchParams: {
    game: General.AdminQuery["field"];
    category: General.AdminQuery["subfield"];
  };
}

export default function GenshinCharacterEdit({
  searchParams,
}: GenshinCharacterEditProps) {
  const endPoint: Route = "/api/post/edit";
  const { game, category } = searchParams;
  const [lang, setLang] = useState<General.PostDocument["lang"]>("English");
  const [charName, setCharName] = useState<string>("");
  const [showData, setShowData] = useState<boolean>(false);
  const { data, isLoading, error } = useSWR(
    endPoint,
    (endPoint) => fetcherWithParams(endPoint, { game, category }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!data || isLoading)
    return <TextField variant="skeleton-variant-1" label="Select Character" />;

  function fetchHandler() {
    const fieldCharacterName = document.getElementById(
      "character-search-name"
    ) as HTMLInputElement;
    setCharName(fieldCharacterName.value);
    setShowData(true);
  }

  return (
    <div>
      <div className="mb-4 text-white font-poppins flex gap-4">
        <input
          type="radio"
          name="lang"
          id="en-query"
          checked={lang === "English"}
          onChange={() => setLang("English")}
        />
        <label htmlFor="en-query">English</label>
        <input
          type="radio"
          name="lang"
          id="id-query"
          checked={lang === "Indonesian"}
          onChange={() => setLang("Indonesian")}
        />
        <label htmlFor="id-query">Indonesia</label>
      </div>
      <div className="grid grid-cols-[300px_auto] gap-4">
        <TextField
          forId="character-search-name"
          variant="default-variant-1"
          list="p"
          label="Select Character"
        />
        <div className="flex gap-4 items-end my-auto">
          <Button
            className={`${VariantClass.fetch} mb-auto`}
            onClick={fetchHandler}
          >
            Tampilkan Data
          </Button>
          {showData && (
            <Button
              className={`${VariantClass.danger} mb-auto`}
              onClick={() => {
                setShowData(false);
                setCharName("");
              }}
            >
              Reset Pencarian
            </Button>
          )}
        </div>
        <datalist id="p">
          {data.data.map((d: string) => (
            <option value={d} key={d} />
          ))}
        </datalist>
      </div>
      {showData && <Form charName={charName} lang={lang} />}
    </div>
  );
}
