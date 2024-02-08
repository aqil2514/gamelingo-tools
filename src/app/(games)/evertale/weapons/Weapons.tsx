"use client";

import List, { ListState } from "@/components/Evertale/List";

export default function CharactersList() {
  const typeWeapon = ["Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  return (
    <div>
      <List listBy="type" subListBy="Sword" type="weapons" key={`weapon-team-sword`} limit={9} loadingAnimation />
      {typeWeapon.map((el, i: number) => (
        <List listBy="type" subListBy={el as ListState["subListBy"]} type="weapons" key={`weapon-team-${i++}`} limit={9} />
      ))}
    </div>
  );
}
