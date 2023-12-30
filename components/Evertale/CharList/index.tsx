"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import CharElement from "./CharElement";
import CharTeam from "./CharTeam";

interface CharListState {
  listBy: "element" | "team";
  subListBy:
    | "fire"
    | "water"
    | "light"
    | "dark"
    | "storm"
    | "earth"
    | "Blood Team"
    | "Burn Team"
    | "Combo Team"
    | "Cursed Sleep Team"
    | "General Team"
    | "Other Team"
    | "Poison Team"
    | "Sleep Team"
    | "Stealth Team"
    | "Stun Team"
    | "Survivor Team";
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

  if (listBy === "element") {
    subData = data.elementChar[subListBy];

    return <CharElement elementData={subData} elementTitle={subListBy} />;
  }
  if (listBy === "team") {
    console.log(data);
    subData = data.charTeam[subListBy];
    return <CharTeam data={subData} title={subListBy} />;
  }
};

export default CharList;
