"use client"
import Button, { VariantClass } from "@/components/Input/Button";
import TextField from "@/components/Input/TextField";
import Loading from "@/components/general/Loading";
import { fetcherWithParams } from "@/lib/Data";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import { useState } from "react";
import useSWR from "swr";
import Form from "./Form";

interface GenshinTalentEditProps {
    searchParams: {
      game: General.AdminQuery["field"];
      category: General.AdminQuery["subfield"];
    };
  }

export default function GenshinTalentEdit({
    searchParams,
  }: GenshinTalentEditProps) {
    const endPoint: Route = "/api/post/edit";
    const { game, category } = searchParams;
    const [lang, setLang] = useState<General.PostDocument["lang"]>("English");
    const [charName, setCharName] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false);
    const [talentData, setTalentData] = useState<GenshinImpact.Talent>(
      {} as GenshinImpact.Talent
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
      return <TextField variant="skeleton-variant-1" label="Select Talent" />;
  
    async function fetchHandler() {
      const fieldTalentName = document.getElementById(
        "Talent-search-name"
      ) as HTMLInputElement;
      const category: General.GameGenshinImpact["category"] = "Talent";
      const endPoint: Route = "/api/gamelingo/genshin-impact/form";
  
      try {
        setIsFetching(true);
        const res = await axios.get(endPoint, {
          params: { category, charName: fieldTalentName.value, lang },
        });
        setTalentData(res.data.formData);
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
            forId="Talent-search-name"
            variant="default-variant-1"
            list="p"
            disabled={isFetching}
            label="Select Talent"
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
                  const fieldTalentName = document.getElementById(
                    "Talent-search-name"
                  ) as HTMLInputElement;
                  fieldTalentName.value = ""
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
        {showData && <Form data={talentData} />}
      </div>
    );
  } 
  