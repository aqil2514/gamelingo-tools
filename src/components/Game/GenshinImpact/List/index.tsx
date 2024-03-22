"use client";

import { Route } from "next";
import useSWR from "swr";
import { fetcher } from "@/lib/Data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import TextField from "@/components/Input/TextField";
import { element } from "@/lib/Data/gi";

interface FilterState {
  element: string;
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
    if (Object.keys(filter).length === 0) return setChars(initChars);
    if (filter.element) {
      const filteredElement = initChars.filter(
        (c) => c.element as unknown as string === filter.element
      );

      setChars(filteredElement);
      return;
    }
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
          <div className="text-center white font-merienda text-lg font-semibold text-white">
            Weapon
          </div>
          <div className="text-center white font-merienda text-lg font-semibold text-white">
            Rarity
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 gap-4 rounded-md">
        {/* TODO : FIX INI. GANTI JADI POTRAIT AJAH FOTONYA */}
        {chars.map((d) => (
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
    </div>
  );
}

function HomePage({ data }: { data: GenshinImpact.CharacterInfo[] }) {
  const [chars, setChars] = useState<GenshinImpact.CharacterInfo[]>([]);

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
