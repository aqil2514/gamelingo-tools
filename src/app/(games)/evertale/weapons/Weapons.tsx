"use client";

import List from "@/components/Evertale/List";

export default function CharactersList() {
  const typeWeapon = ["Axe", "Staff", "Mace", "GreatSword", "GreatAxe", "Spear", "Hammer", "Katana"];

  return (
    <div>
      <List listBy="type" subListBy="Sword" type="weapons" key={`weapon-team-sword`} limit={9} loadingAnimation />
      {typeWeapon.map((el, i: number) => (
        <List listBy="type" subListBy={el} type="weapons" key={`weapon-team-${i++}`} limit={9} />
      ))}
    </div>
  );
}
