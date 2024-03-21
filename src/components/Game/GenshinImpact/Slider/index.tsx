"use client";

import { Route } from "next";
import useSWR from "swr";
import { fetcher } from "@/lib/Data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import TextField from "@/components/Input/TextField";


const rightAlignNameChar = ["Raiden Shogun"];

export default function Character() {
  const category: General.GameGenshinImpact["category"] = "Character";
  const url: Route = `/api/gamelingo/genshin-impact/slide?category=${category}`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  if (!data || isLoading) return <p>loading...</p>;

  return <SliderDefault data={data.data} />;
}

function SliderDefault({ data }: { data: GenshinImpact.CharacterInfo[] }) {
  const [chars, setChars] = useState<GenshinImpact.CharacterInfo[]>([]);
  const [initChars, setInitChars] = useState<GenshinImpact.CharacterInfo[]>([]);
  const [charNameInput, setCharNameInput] = useState<string>("")

  useEffect(() => {
    setChars(data);
    setInitChars(data);
  }, [data])

  useEffect(() => {
    if(!charNameInput) return setChars(initChars);
  
    const charName = initChars.filter(c => c.name.toLowerCase().includes(charNameInput.toLowerCase()));
    setChars(charName);
  }, [charNameInput, initChars]);
  

  // const charName = useMemo(() => {
  //   const result:string[] = chars.map((c) => c.name)
  //   return result
  // }, [chars])

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold font-nova-square text-white">
        Character
      </h2>
        <TextField forId="character-name" variant="outline-variant-1" label="Search" placeholder="Cari karakter berdasarkan nama" value={charNameInput} onChange={(e) => setCharNameInput(e.target.value)} />
      <div className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 gap-4 rounded-md">



        {/* TODO : FIX INI. GANTI JADI POTRAIT AJAH FOTONYA */}
      {chars.map((d) => (
          <div
            key={d.id}
            className={`relative max-w-[115px] max-h-[130px] my-4 rounded-lg`}
          >
            {/* <div className="p-4 bg-[rgba(0,_0,_0,_0.6)] flex justify-center gap-4">
              <Image
                src={`/Genshin-Impact/assets/Element_${d.element}.svg`}
                width={48}
                height={48}
                alt={`${d.element}`}
                className="my-auto"
              />
              <div>
                <div className="my-2 flex justify-center">
                  {[...Array(Number(d.rarity))].map((_, index) => (
                    <Image
                      key={index}
                      src={"/Genshin-Impact/assets/General_Star.webp"}
                      width={16}
                      height={16}
                      alt="star"
                    />
                  ))}
                </div>
                <p className="text-white font-bold font-mclaren text-2xl">
                  {d.name}
                </p>
              </div>
            </div> */}
            <Link href={`/genshin-impact/character/${d.name}`}>
            <Image
              src={d.image}
              width={115}
              height={130}
              alt={d.name}
              title={d.name}
              className={`w-auto h-auto object-cover object-bottom cursor-pointer ${
                rightAlignNameChar.includes(d.name) ? "ml-auto" : "mx-auto"
              }`}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
