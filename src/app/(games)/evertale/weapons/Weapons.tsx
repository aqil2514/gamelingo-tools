"use client";

import List from "@/components/Evertale/List";
import WeapList from "@/components/Evertale/WeapList";
import { useState } from "react";

type ListByState = "type";

export default function CharactersList() {
  const [listBy, setListBy] = useState<ListByState>("type");

  const typeWeapon = ["Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  return (
    <div>
      <List listBy="type" subListBy="Sword" type="weapons" key={`weapon-team-sword`} limit={9} loadingAnimation />
      {typeWeapon.map((el: string, i: number) => (
        //@ts-ignore
        <List listBy="type" subListBy={el} type="weapons" key={`weapon-team-${i++}`} limit={9} />
      ))}
    </div>
  );
}
