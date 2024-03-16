"use client";

import { Route } from "next";
import useSWR from "swr";
import { fetcher } from "@/lib/Data";
import Image from "next/image";


const rightAlignNameChar = ["Raiden Shogun"];

export default function Character() {
  const category: General.GameGenshinImpact["category"] = "Character";
  const url: Route = `/api/gamelingo/genshin-impact/slide?category=${category}`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  if (!data || isLoading) return <p>loading...</p>;

  return <SliderDefault data={data.data} />;
}

function SliderDefault({ data }: { data: GenshinImpact.CharacterInfo[] }) {
  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold font-nova-square text-white">
        Character
      </h2>
      <div className="grid grid-cols-8 gap-4 rounded-md">
        {/* TODO : FIX INI. GANTI JADI POTRAIT AJAH FOTONYA */}
      {data.map((d) => (
          <div
            key={d.id}
            className={`relative max-w-[115px] max-h-[130px] my-4 ${
              d.rarity === "4"
                ? "bg-gradient-to-tr from-violet-500 to-violet-700 "
                : "bg-gradient-to-tr from-amber-400 to-amber-600"
            }`}
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
            <Image
              src={d.image}
              width={115}
              height={130}
              alt={d.name}
              className={`w-auto object-cover object-center ${
                rightAlignNameChar.includes(d.name) ? "ml-auto" : "mx-auto"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
