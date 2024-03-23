"use client";

import { Route } from "next";
import useSWR from "swr";
import { fetcher } from "@/lib/Data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import TextField from "@/components/Input/TextField";
import { element, weapon } from "@/lib/Data/gi";
import Button, { VariantClass } from "@/components/Input/Button";

interface FilterState {
  element: string;
  weapon: string;
  rarity: string;
}

const rightAlignNameChar = ["Raiden Shogun"];

export default function Character({
  template,
}: {
  template: "welcome page" | "character page";
}) {
  const category: General.GameGenshinImpact["category"] = "Character";
  const url: Route = `/api/gamelingo/genshin-impact/slide?category=${category}`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  if (!data || isLoading) return <p>loading...</p>;
  if (template === "character page") return <ListDefault data={data.data} />;

  return <HomePage data={data.data} />;
}

function ListDefault({ data }: { data: GenshinImpact.CharacterInfo[] }) {
  const [chars, setChars] = useState<GenshinImpact.CharacterInfo[]>([]);
  const [initChars, setInitChars] = useState<GenshinImpact.CharacterInfo[]>([]);
  const [charNameInput, setCharNameInput] = useState<string>("");
  const [filter, setFilter] = useState<FilterState>({} as FilterState);

  useEffect(() => {
    setChars(data);
    setInitChars(data);
  }, [data]);

  useEffect(() => {
    if (!charNameInput) return setChars(initChars);

    const charName = initChars.filter((c) =>
      c.name.toLowerCase().includes(charNameInput.toLowerCase())
    );
    setChars(charName);
  }, [charNameInput, initChars]);

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      setChars(initChars);
      return;
    }
  
    const filteredChars = initChars.filter((c) => {
      const isElementMatch = !filter.element || c.element as unknown as string === filter.element;
      const isWeaponMatch = !filter.weapon || c.weapon as unknown as string === filter.weapon;
      const isRarityMatch = !filter.rarity || c.rarity as unknown as string === filter.rarity;
  
      return isElementMatch && isWeaponMatch && isRarityMatch;
    });
  
    setChars(filteredChars);
  }, [initChars, filter]);
  

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-bold font-nova-square text-white">
        Character
      </h2>
      <TextField
        forId="character-name"
        variant="outline-variant-1"
        label="Search"
        placeholder="Cari karakter berdasarkan nama"
        value={charNameInput}
        onChange={(e) => setCharNameInput(e.target.value)}
      />
      <div className="py-4">
        <h3 className="text-center text-xl font-bold font-nova-square text-white">
          Urutkan Berdasarkan:
        </h3>
        <div className="p-4 my-4 border-4 border-double border-white rounded-xl grid gap-4 grid-cols-3">
          {/* SHORT BY ELEMENT  */}
          <div className="text-center white font-merienda text-lg font-semibold text-white">
            <h4>Element</h4>
            <div className="flex gap-4 justify-center py-2">
              {element.map((el) => (
                <label htmlFor={el.id} key={el.id}>
                  <input
                    type="radio"
                    name="element-filter"
                    value={el.name}
                    id={el.id}
                    className="hidden"
                    onChange={(e) =>
                      setFilter({ ...filter, element: e.target.value })
                    }
                  />
                  <Image
                    src={el.img}
                    alt={el.name}
                    width={32}
                    height={32}
                    className={`h-auto hover:opacity-100 transition-all duration-200 ${
                      filter.element === el.name
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  />
                </label>
              ))}
            </div>
            {filter.element && (
              <h4 className="text-center text-xl font-bold font-nova-square text-white">
                {filter.element}
              </h4>
            )}
          </div>

          {/* SORT BY WEAPON  */}
          <div className="text-center white font-merienda text-lg font-semibold text-white">
            Weapon
            <div className="flex gap-4 justify-center py-2">
              {weapon.map((el) => (
                <label htmlFor={el.id} key={el.id}>
                  <input
                    type="radio"
                    name="element-filter"
                    value={el.name}
                    id={el.id}
                    className="hidden"
                    onChange={(e) =>
                      setFilter({ ...filter, weapon: e.target.value })
                    }
                  />
                  <Image
                    src={el.img}
                    alt={el.name}
                    width={32}
                    height={32}
                    className={`h-auto hover:opacity-100 transition-all duration-200 ${
                      filter.weapon === el.name
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  />
                </label>
              ))}
            </div>
            <h4 className="text-center text-xl font-bold font-nova-square text-white">
              {filter.weapon}
            </h4>
          </div>

          {/* SORT BY RARITY  */}
          <div className="text-center white font-merienda text-lg font-semibold text-white">
            Rarity
            <div className="flex gap-4 justify-center py-2">
              <label htmlFor={"rarity-4"} onClick={() => setFilter({...filter, rarity: "4"})}>
                <input
                  type="radio"
                  name="rarity-filter"
                  id={"rarity-4"}
                  className="hidden"
                />
                <div className="flex">
                  <p
                    className={`font-bold text-red-600 font-merriweather my-auto ${
                      filter.rarity === "4"
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  >
                    4
                  </p>
                  <Image
                    src={"/Genshin-Impact/assets/General_Star.webp"}
                    alt={"Rarity 4"}
                    width={32}
                    height={32}
                    className={`h-auto hover:opacity-100 transition-all duration-200 ${
                      filter.rarity === "4"
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  />
                </div>
              </label>

              <label htmlFor={"rarity-5"} onClick={() => setFilter({...filter, rarity: "5"})}>
                <input
                  type="radio"
                  name="rarity-filter"
                  value={"4"}
                  id={"rarity-5"}
                  className="hidden"
                  onChange={(e) =>
                    setFilter({ ...filter, rarity: e.target.value })
                  }
                />
                <div className="flex">
                  <p
                    className={`font-bold text-red-600 font-merriweather my-auto ${
                      filter.rarity === "5"
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  >
                    5
                  </p>
                  <Image
                    src={"/Genshin-Impact/assets/General_Star.webp"}
                    alt={"Rarity 5"}
                    width={32}
                    height={32}
                    className={`h-auto hover:opacity-100 transition-all duration-200 ${
                      filter.rarity === "5"
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  />
                </div>
              </label>

            </div>
            {filter.rarity && (
              <h4 className="text-center text-xl font-bold font-nova-square text-white">
                {filter.rarity} Stars
              </h4>
            )}
          </div>
        </div>
        {Object.keys(filter).length !== 0&&<Button className={VariantClass.danger} onClick={() => setFilter({} as FilterState)}>Reset Filter</Button>}
      </div>
      {chars.length === 0 ? <p className="text-white text-2xl text-center font-bold font-nova-square">Tidak ada data character dengan filter tersebut</p>: (<div className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 gap-4 rounded-md">
        {/* TODO : FIX INI. GANTI JADI POTRAIT AJAH FOTONYA */}
        {chars.map((d) => (
          <div
            key={d.id}
            className={`relative max-w-[115px] max-h-[130px] my-4 rounded-lg`}
          >
            <Link href={`/genshin-impact/character/${d.id}`}>
              <div
                className={`relative w-[115px] h-[100px] max-w-[115px] max-h-[130px] my-4 rounded-lg`}
              >
                <Image
                  src={d.image}
                  fill
                  sizes="auto"
                  alt={d.name}
                  title={d.name}
                  className={`w-auto h-auto object-cover object-bottom cursor-pointer ${
                    rightAlignNameChar.includes(d.name) ? "ml-auto" : "mx-auto"
                  }`}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>)}
    </div>
  );
}

function HomePage({ data }: { data: GenshinImpact.CharacterInfo[] }) {
  const [chars, setChars] = useState<GenshinImpact.CharacterInfo[]>([]);

  useEffect(() => {
    setChars(data);
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold font-nova-square text-white">
        Character
      </h2>
      <div className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 gap-4 rounded-md">
        {/* TODO : FIX INI. GANTI JADI POTRAIT AJAH FOTONYA */}
        {chars
          .slice(0, 16)
          .sort(() => Math.random() - 0.5)
          .map((d) => (
            <div
              key={d.id}
              className={`relative max-w-[115px] max-h-[130px] my-4 rounded-lg`}
            >
              <Link href={`/genshin-impact/character/${d.id}`}>
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
      <div className="block text-center my-4 border-t-4 border-double border-t-white pt-4">
        <Link
          href={"/genshin-impact/character"}
          className="font-semibold font-nova-square text-white"
        >
          Lihat Lebih Banyak &gt;&gt;
        </Link>
      </div>
    </div>
  );
}
