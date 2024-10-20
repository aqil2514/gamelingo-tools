import { Metadata } from "next";
import { Body, Header } from "./_components";
import { Model } from "mongoose";
import { CharacterEN, CharacterID } from "@/models/GenshinImpact/Character";

export const metadata: Metadata = {
  title: "Genshin Impact",
  description: "Step Into a Vast Magical World of Adventure",
};

// Fetch All Data
const getCharacters = async (lang: General.Languages) => {
  const docSelect: Record<typeof lang, Model<any>> = {
    en: CharacterEN,
    id: CharacterID,
  };

  const doc = docSelect[lang];

  const characters = (await doc.find()) as GenshinImpact.Character[];

  return characters;
};

export default async function GenshinImpact({
  params,
}: {
  params: General.ParamsBasic;
}) {
  const characters = await getCharacters(params.lang);

  return (
    <div className={"main-wrapper pb-10"}>
      <Header />
      <Body characters={characters} />
    </div>
  );
}
