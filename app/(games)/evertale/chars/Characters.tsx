"use client";

import CharList from "@/components/Evertale/CharList";
import { useState } from "react";

type ListByState = "element" | "team";

export default function CharactersList() {
  const [listBy, setListBy] = useState<ListByState>("element");

  return (
    <div>
      <OptionSort setListBy={setListBy} />
      {listBy === "element" && <CharElement listBy="element" />}
      {listBy === "team" && <CharTeam listBy="team" />}
    </div>
  );
}

const OptionSort = ({ setListBy }: React.ComponentState) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl text-white font-bold font-merienda">Sort Char By :</h1>
      <Option value="element" checked={true} setListBy={setListBy} />
      <Option value="team" checked={false} setListBy={setListBy} />
    </div>
  );
};

const CharElement = ({ listBy }: { listBy: ListByState }) => {
  return (
    <>
      <CharList listBy={listBy} loadingAnimation={true} subListBy="fire" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="water" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="light" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="dark" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="storm" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="earth" />
    </>
  );
};

const CharTeam = ({ listBy }: { listBy: ListByState }) => {
  return (
    <>
      <CharList listBy={listBy} loadingAnimation={true} subListBy="Blood Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Burn Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Combo Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Cursed Sleep Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="General Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Other Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Poison Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Sleep Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Stealth Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Stun Team" />
      <CharList listBy={listBy} loadingAnimation={false} subListBy="Survivor Team" />
    </>
  );
};

const Option = ({ value, setListBy, checked }: { value: ListByState; checked: boolean; setListBy: React.ComponentState }) => {
  return (
    <label htmlFor={`sort-char-by-${value}`} className="my-2">
      <input type="radio" name="sort-char" value={value} defaultChecked={checked} onChange={(e) => setListBy(e.target.value)} id={`sort-char-by-${value}`} />
      <span className="capitalize text-white font-semibold mx-2 font-mclaren">{value}</span>
    </label>
  );
};
