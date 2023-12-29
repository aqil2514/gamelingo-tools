"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import CharElement from "./CharElement";

interface CharListState {
  listBy: "element";
  subListBy: "fire" | "water" | "light" | "dark" | "storm" | "earth";
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const CharList = ({ listBy, subListBy }: CharListState) => {
  const URL = `/api/gamelingo/evertale/chars?category=${listBy}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);
  let subData;

  if (!data || isLoading) return <Loading />;
  if (error) return <Error />;

  if (listBy === "element") {
    subData = data.elementChar[subListBy];

    return <CharElement elementData={subData} elementTitle={subListBy} />;
  }
};

export default CharList;
