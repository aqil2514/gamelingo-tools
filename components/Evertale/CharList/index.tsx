"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import CharElement from "./CharElement";

interface CharListState {
  listBy: "element";
  subListBy: "fire" | "water" | "light" | "dark" | "storm" | "earth";
  loadingAnimation?: boolean;
  textOn?: boolean;
  text?: string;
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const CharList = ({ listBy, subListBy, loadingAnimation = false, textOn, text }: CharListState) => {
  const URL = `/api/gamelingo/evertale/chars?category=${listBy}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);
  let subData;

  if (!data || isLoading) {
    if (loadingAnimation) return <Loading loading={1} textOn={textOn as boolean} text={text} />;
    return <></>;
  }

  if (error) return <Error />;

  console.log(data);

  if (listBy === "element") {
    subData = data.elementChar[subListBy];

    return <CharElement elementData={subData} elementTitle={subListBy} />;
  }
};

export default CharList;
