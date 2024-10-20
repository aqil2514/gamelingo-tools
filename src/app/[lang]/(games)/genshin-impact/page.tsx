import { Metadata } from "next";
import { Body, Header } from "./_components";
import { Model } from "mongoose";
import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";
import { getCharacterTable } from "./_utils";

export const metadata: Metadata = {
  title: "Genshin Impact",
  description: "Step Into a Vast Magical World of Adventure",
};

export default async function GenshinImpact({
  params,
}: {
  params: General.ParamsBasic;
}) {
  const characters = await getCharacterTable();

  return (
    <div className={"main-wrapper pb-10"}>
      <Header />
      <Body characters={characters} />
    </div>
  );
}
