"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import WeapType from "./WeapType";

interface WeapListState {
  listBy: "type";
  subListBy: string;
  loadingAnimation?: boolean;
  textOn?: boolean;
  text?: string;
  isGrid?: boolean;
  limit?: number;
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const WeapList = ({ listBy, subListBy, loadingAnimation = false, textOn, text, isGrid = false, limit = 100 }: WeapListState) => {
  const URL = `/api/gamelingo/evertale/weapons?category=${listBy}&limit=${limit}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);
  let subData;

  if (!data || isLoading) {
    if (loadingAnimation) return <Loading loading={1} textOn={textOn as boolean} text={text} />;
    return <></>;
  }

  if (error) return <Error />;

  if (listBy === "type") {
    subData = data.weapons[subListBy.toLocaleLowerCase()];

    return <WeapType weapons={subData} weaponName={subListBy} isGrid={isGrid} />;
  }
};

export default WeapList;
