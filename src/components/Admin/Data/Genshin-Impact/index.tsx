"use client";
import { authorizationToken, fetcherWithAuth } from "@/components/general/Data";
import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import { Route } from "next";
import useSWR from "swr";
import MaterialData from "./MaterialData";

interface GenshinImpactDataProps {
  field: General.AdminQuery["field"];
  subfield: General.AdminQuery["subfield"];
}

export default function GenshinImpactData({ field, subfield }: GenshinImpactDataProps) {
  const url: Route = `/api/admin?field=${field}&subfield=${subfield}`;
  const { data, isLoading, error } = useSWR(url, (url) => fetcherWithAuth(url, authorizationToken));

  if (!data || isLoading) return <Loading loading={1} textOn />;
  if (error) return <Error />;

  if (subfield === "Material") return <MaterialData data={data.data} />;
}
