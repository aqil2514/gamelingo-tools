"use client";
import Button, { VariantClass } from "@/components/Input/Button";
import Select from "@/components/Input/Select";
import TextField from "@/components/Input/TextField";
import { fetcherWithParams } from "@/lib/Data";
import { Route } from "next";
import { useState } from "react";
import useSWR from "swr";
import Form from "./Form";
import axios, { isAxiosError } from "axios";
import Loading from "@/components/general/Loading";

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
  const [showData, setShowData] = useState<boolean>(false);
  const [charData, setCharData] = useState<GenshinImpact.Character>(
    {} as GenshinImpact.Character
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);

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

  async function fetchHandler() {
    const fieldCharacterName = document.getElementById(
      "character-search-name"
    ) as HTMLInputElement;
    const category: General.GameGenshinImpact["category"] = "Character";
    const endPoint: Route = "/api/gamelingo/genshin-impact/form";

    try {
      setIsFetching(true);
      const res = await axios.get(endPoint, {
        params: { category, charName: fieldCharacterName.value, lang },
      });
      setCharData(res.data.formData);
      setShowData(true);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
      }
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div>
      <div className="mb-4 text-white font-poppins flex gap-4">
        <input
          type="radio"
          name="lang"
          id="en-query"
          checked={lang === "English"}
          disabled={isFetching}
          onChange={() => setLang("English")}
        />
        <label htmlFor="en-query">English</label>
        <input
          type="radio"
          name="lang"
          id="id-query"
          checked={lang === "Indonesian"}
          disabled={isFetching}
          onChange={() => setLang("Indonesian")}
        />
        <label htmlFor="id-query">Indonesia</label>
      </div>
      <div className="grid grid-cols-[300px_auto] gap-4">
        <TextField
          forId="character-search-name"
          variant="default-variant-1"
          list="p"
          disabled={isFetching}
          label="Select Character"
        />
        <div className="flex gap-4 items-end my-auto">
          {!showData && <Button
            className={`${VariantClass.fetch} mb-auto`}
            disabled={isFetching}
            onClick={fetchHandler}
          >
            Tampilkan Data
          </Button>}
          {showData && (
            <Button
              className={`${VariantClass.danger} mb-auto`}
              disabled={isFetching}
              onClick={() => {
                const fieldCharacterName = document.getElementById(
                  "character-search-name"
                ) as HTMLInputElement;
                fieldCharacterName.value = ""
                setShowData(false);
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
      {isFetching && <Loading loading={1} textOn text="Mengambil data..." />}
      {showData && <Form data={charData} />}
    </div>
  );
}
