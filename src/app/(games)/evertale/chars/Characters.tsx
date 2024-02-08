"use client";

import List, { ListState } from "@/components/Evertale/List";
import { Option } from "@/components/general/Option";
import { useState } from "react";

type ListByState = "element" | "team" | "weapon";
const element = ["water", "light", "dark", "storm", "earth"];
const team = ["Burn Team", "Combo Team", "Cursed Sleep Team", "General Team", "Other Team", "Poison Team", "Sleep Team", "Stealth Team", "Stun Team", "Survivor Team"];
const weapon = ["Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

export default function CharactersList() {
  const [listBy, setListBy] = useState<ListByState>("element");

  return (
    <div>
      <OptionSort listBy={listBy} setListBy={setListBy} />
      {listBy === "element" && <CharElement />}
      {listBy === "team" && <CharTeam />}
      {listBy === "weapon" && <CharWeapon />}
    </div>
  );
}

const OptionSort = ({ listBy, setListBy }: React.ComponentState) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl text-white font-bold font-merienda">Sort Char By :</h1>
      <Option status={listBy} setStatus={setListBy} value="element" title="Element" name="sort-character" variant={2} />
      <Option status={listBy} setStatus={setListBy} value="team" title="Team" name="sort-character" variant={2} />
      <Option status={listBy} setStatus={setListBy} value="weapon" title="Weapon" name="sort-character" variant={2} />
    </div>
  );
};

const CharWeapon = () => {
  return (
    <>
      <List listBy="weapon" subListBy="Sword" type="chars" key={`weapon-team-sword`} limit={9} loadingAnimation />
      {weapon.map((el, i: number) => (
        <List listBy="weapon" subListBy={el as ListState["subListBy"]} type="chars" key={`weapon-team-${i++}`} limit={9} />
      ))}
    </>
  );
};

const CharElement = () => {
  return (
    <>
      <List listBy="element" subListBy="fire" type="chars" key={`element-character-fire`} limit={9} loadingAnimation />
      {element.map((el, i: number) => (
        <List listBy="element" subListBy={el as ListState["subListBy"]} type="chars" key={`element-character-${i++}`} limit={9} />
      ))}
    </>
  );
};

const CharTeam = () => {
  return (
    <>
      <List listBy="team" subListBy="Blood Team" type="chars" key={`character-blood-team`} limit={9} loadingAnimation />
      {team.map((el, i: number) => (
        <List listBy="team" subListBy={el as ListState["subListBy"]} type="chars" key={`character-team-${i++}`} limit={9} />
      ))}
    </>
  );
};
