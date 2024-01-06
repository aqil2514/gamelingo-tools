"use client";

import CharList from "@/components/Evertale/CharList";
import { useState } from "react";

type ListByState = "element" | "team" | "weapon";

export default function CharactersList() {
  const [listBy, setListBy] = useState<ListByState>("element");

  return (
    <div>
      <OptionSort setListBy={setListBy} />
      {listBy === "element" && <CharElement listBy="element" />}
      {listBy === "team" && <CharTeam listBy="team" />}
      {listBy === "weapon" && <CharWeapon listBy="weapon" />}
    </div>
  );
}

const OptionSort = ({ setListBy }: React.ComponentState) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl text-white font-bold font-merienda">Sort Char By :</h1>
      <Option value="element" checked={true} setListBy={setListBy} />
      <Option value="team" checked={false} setListBy={setListBy} />
      <Option value="weapon" checked={false} setListBy={setListBy} />
    </div>
  );
};

const CharWeapon = ({ listBy }: { listBy: ListByState }) => {
  return (
    <>
      <CharList limit={9} listBy={listBy} loadingAnimation={true} subListBy="Axe" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="GreatAxe" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="GreatSword" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Hammer" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Katana" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Mace" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Spear" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Staff" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Sword" />
    </>
  );
};

const CharElement = ({ listBy }: { listBy: ListByState }) => {
  return (
    <>
      <CharList limit={9} listBy={listBy} loadingAnimation={true} subListBy="fire" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="water" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="light" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="dark" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="storm" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="earth" />
    </>
  );
};

const CharTeam = ({ listBy }: { listBy: ListByState }) => {
  return (
    <>
      <CharList limit={9} listBy={listBy} loadingAnimation={true} subListBy="Blood Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Burn Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Combo Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Cursed Sleep Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="General Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Other Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Poison Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Sleep Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Stealth Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Stun Team" />
      <CharList limit={9} listBy={listBy} loadingAnimation={false} subListBy="Survivor Team" />
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
