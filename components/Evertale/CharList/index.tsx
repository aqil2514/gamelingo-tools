"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import useSWR from "swr";
import CharElement from "./CharElement";
import CharTeam from "./CharTeam";
import CharWeapon from "./CharWeapon";

interface CharListState {
  listBy: "element" | "team" | "weapon";
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
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const CharList = ({ listBy, subListBy, loadingAnimation = false, textOn, text, isGrid = false }: CharListState) => {
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

    return <CharElement elementData={subData} elementTitle={subListBy} isGrid={isGrid} />;
  }
  if (listBy === "team") {
    subData = data.charTeam[subListBy];
    return <CharTeam data={subData} title={subListBy} isGrid={isGrid} />;
  }
  if (listBy === "weapon") {
    subData = data.charWeapon[subListBy];
    return <CharWeapon data={subData} title={subListBy} isGrid={isGrid} />;
  }
};

export default CharList;
