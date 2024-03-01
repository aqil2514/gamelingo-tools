"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import { Route } from "next";
import useSWR from "swr";
import CharacterData from "./CharacterData";
import LeaderSkillData from "./LeaderSkillData";
import PassiveSkillData from "./PassiveSkillData";
import TypeSkillData from "./TypeSkillData";
import WeaponsData from "./WeaponData";

interface EvertaleDataProps {
  subfield: string;
  field: string;
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function EvertaleData({ subfield, field }: EvertaleDataProps) {
  const url: Route = `/api/admin?field=${field}&subfield=${subfield}`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  if (!data || isLoading) return <Loading loading={1} textOn />;
  if (error) return <Error />;

  if (subfield === "chars") return <CharacterData data={data.data} />;
  if (subfield === "leaderskills") return <LeaderSkillData data={data.data} />;
  if (subfield === "weapons") return <WeaponsData data={data.data} />;
  if (subfield === "typeskills") return <TypeSkillData data={data.data} />;
  if (subfield === "passives") return <PassiveSkillData data={data.data} />;
}
