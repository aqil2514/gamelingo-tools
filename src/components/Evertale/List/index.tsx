"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import GridList from "./GridList";
import ScrollList from "./ScrollList";

interface ListState {
  listBy: "element" | "team" | "weapon" | "type";
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
    | "Survivor Team"
    | "Sword"
    | "Axe"
    | "Staff"
    | "Mace"
    | "GreatSword"
    | "GreatAxe"
    | "Spear"
    | "Hammer"
    | "Katana";
  loadingAnimation?: boolean;
  textOn?: boolean;
  text?: string;
  isGrid?: boolean;
  limit?: number;
  type: "chars" | "weapons";
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const List = ({ listBy, subListBy, type, loadingAnimation = false, textOn, text, isGrid = false, limit = 100 }: ListState) => {
  const URL = `/api/gamelingo/evertale/${type}?category=${listBy}&limit=${limit}`;
  const res = useSWR(URL, fetcher);
  let subData;

  if (!res.data || res.isLoading) {
    if (loadingAnimation) return <Loading loading={1} textOn={textOn as boolean} text={text} />;
    return <></>;
  }

  subData = res.data.data[subListBy.toLowerCase()];

  if (isGrid) return <GridList data={subData} title={subListBy} path={type} sort={listBy} />;

  return <ScrollList data={subData} path={type} sort={listBy} title={subListBy} />;
};

export default List;
