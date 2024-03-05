"use client";
import { authorizationToken, fetcherWithAuth } from "@/components/general/Data";
import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import { Route } from "next";
import useSWR from "swr";
import MaterialData from "./MaterialData";
import { useState } from "react";
import ArtifactData from "./ArtifactData";
import WeaponData from "./WeaponData";
import CharacterData from "./CharacterData";

interface GenshinImpactDataProps {
  field: General.AdminQuery["field"];
  subfield: General.AdminQuery["subfield"];
}

export default function GenshinImpactData({ field, subfield }: GenshinImpactDataProps) {
  const [lang, setLang] = useState<General.PostDocument["lang"]>("English");

  const url: Route = `/api/admin?field=${field}&subfield=${subfield}&lang=${lang}`;
  const { data, isLoading, error } = useSWR(url, (url) => fetcherWithAuth(url, authorizationToken));

  if (!data || isLoading) return <Loading loading={1} textOn />;
  if (error) return <Error />;

  if (subfield === "Material") return <MaterialData data={data.data} lang={lang} setLang={setLang} />;
  if (subfield === "Artifact") return <ArtifactData data={data.data} lang={lang} setLang={setLang} />;
  if (subfield === "Weapon") return <WeaponData data={data.data} lang={lang} setLang={setLang} />;
  if (subfield === "Character") return <CharacterData data={data.data} lang={lang} setLang={setLang} />;
}
