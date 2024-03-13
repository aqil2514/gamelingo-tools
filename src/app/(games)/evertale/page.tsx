import { Metadata, Route } from "next";
import Slider from "@/components/Evertale/Slider";
import GameDescription from "@/components/general/GameDescription";
import DownloadButton from "@/components/general/Download";
import Character from "@/models/Evertale/Characters";
import { baseUrl } from "@/lib/Data";
import CharSlider from "@/components/Evertale/Slider/CharSlider";
import { Weapon } from "@/models/Evertale/Weapons";
import WeaponSlider from "@/components/Evertale/Slider/WeaponSlider";
import Link from "next/link";
import Button, { VariantClass } from "@/components/Input/Button";

export const metadata: Metadata = {
  title: "Evertale",
  description: "Explore sprawling landscapes, bustling cities, and mythical dungeons in this expansive open-world RPG!",
  metadataBase: new URL("https://gamelingo-tools.vercel.app"),
};

async function getCharacters(){
  const chars = await Character.find().sort({ createdAt: -1 }) as unknown as Evertale.Character.State[];
  const data:Evertale.QuickInfo[] = chars.map((d) => ({
    id: d._id as string,
    image: d.charImage.f1Img,
    name: d.charStatus.charName,
    link: `/evertale/chars/${d._id}`
  }));
  const characters: Evertale.QuickInfo[] = [];

  for (let i = 0; i < 15; i++) {
    characters.push(data[i]);
  }

  return characters;
}

async function getWeapons(){
  const weapons = await Weapon.find().sort({ createdAt: -1 }) as unknown as Evertale.Weapon.State[];
  const data:Evertale.QuickInfo[] = weapons.slice(0, 15).map((weapon) => ({
    id: weapon._id as string,
    name: weapon.weapName,
    image: weapon.weapImage.webp,
    link: `/evertale/weapons/${weapon._id}` as Route,
  }));

  return data
}

export default async function Evertale() {
  const characters = await getCharacters();
  const weapons = await getWeapons();

  return (
    <div className={"main-wrapper pb-10"}>
      <div className="mt-14 px-4 w-full h-[50vh] bg-no-repeat bg-cover bg-fixed bg-bottom sm:bg-top bg-evertale-hero-pattern flex flex-col content-center justify-center">
        <GameDescription game="Evertale" />
        <div className="flex justify-center">
          <DownloadButton game="Evertale" downloadFrom="Playstore" />
          <DownloadButton game="Evertale" downloadFrom="AppStore" />
        </div>
      </div>
      
      <CharSlider characters={characters}/>
      <Link href={"/evertale/chars"}> 
      <Button className={VariantClass.fetch + " my-4 mx-auto"}>Lihat lebih banyak</Button>
      </Link>
      <WeaponSlider weapons={weapons}  />
      <Link href={"/evertale/weapons"}> 
      <Button className={VariantClass.fetch + " my-4 mx-auto"}>Lihat lebih banyak</Button>
      </Link>
    </div>
  );
}
