"use client";

import WeapList from "@/components/Evertale/WeapList";
import { useState } from "react";

type ListByState = "type";

export default function CharactersList() {
  const [listBy, setListBy] = useState<ListByState>("type");

  const typeWeapon = ["Sword", "Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  return (
    <div>
      {typeWeapon.map((weapon: string, i: number) => (
        <div key={`weapon-${i++}`}>
          <WeapList listBy={listBy} subListBy={weapon} isGrid={false} limit={9} />
        </div>
      ))}
    </div>
  );
}
