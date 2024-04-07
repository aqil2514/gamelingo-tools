"use client";

import { Route } from "next";
import useSWR from "swr";
import { fetcher } from "@/lib/Data";
import { useEffect, useState } from "react";
import TextField from "@/components/Input/TextField";
import FilterCharacter from "./Filtering";
import CharacterList from "./CharacterList";
import { Link } from "@/navigation";
import { useMessages } from "next-intl";
import { useParams } from "next/navigation";

export interface FilterState {
  element: string;
  weapon: string;
  rarity: string;
}

interface CharacterProps {
  template: "welcome page" | "character page";
  // message:
  //   | Internationalization.GenshinHomeInterface
  //   | Internationalization.GenshinCharacterPage;
}

export default function Character({ template }: CharacterProps) {
  const param = useParams();
  const category: General.GameGenshinImpact["category"] = "Character";
  const url: Route = `/api/gamelingo/genshin-impact/slide?category=${category}&lang=${param.lang}`;
  const { data, isLoading, error } = useSWR(url, fetcher);

  if (!data || isLoading) return <SkeletonDefault />;
  if (template === "character page") return <ListDefault data={data.data} />;

  return (
    <HomePage
      data={data.data}
    />
  );
}

function ListDefault({ data }: { data: GenshinImpact.CharacterInfo[]}) {
  const [chars, setChars] = useState<GenshinImpact.CharacterInfo[]>([]);
  const [initChars, setInitChars] = useState<GenshinImpact.CharacterInfo[]>([]);
  const [charNameInput, setCharNameInput] = useState<string>("");
  const [filter, setFilter] = useState<FilterState>({} as FilterState);
  const messages = useMessages();
  const message = messages.GenshinCharacterPage as unknown as Internationalization.GenshinCharacterPage

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
      const isElementMatch =
        !filter.element || (c.element as unknown as string) === filter.element;
      const isWeaponMatch =
        !filter.weapon || (c.weapon as unknown as string) === filter.weapon;
      const isRarityMatch =
        !filter.rarity || (c.rarity as unknown as string) === filter.rarity;

      return isElementMatch && isWeaponMatch && isRarityMatch;
    });

    setChars(filteredChars);
  }, [initChars, filter]);

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-bold font-nova-square text-white">
        {message.titleText}
      </h2>
      <TextField
        forId="character-name"
        variant="outline-variant-1"
        label={message.searchText}
        placeholder={message.placeHolderText}
        value={charNameInput}
        onChange={(e) => setCharNameInput(e.target.value)}
      />
      <FilterCharacter filter={filter} setFilter={setFilter} />

      {chars.length === 0 ? (
        <p className="text-white text-2xl text-center font-bold font-nova-square">
          {message.noMatch}
        </p>
      ) : (
        <div className="grid lg:grid-cols-7 md:grid-cols-6 grid-cols-3 gap-4 rounded-md">
          {chars.map((d) => (
            <CharacterList d={d} key={d.id} />
          ))}
        </div>
      )}
    </div>
  );
}

function HomePage({
  data,
}: {
  data: GenshinImpact.CharacterInfo[];
}) {
  const [chars, setChars] = useState<GenshinImpact.CharacterInfo[]>([]);

  useEffect(() => {
    setChars(data);
  }, [data]);

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold font-nova-square my-4 text-white">
        {/* {messages} */}
      </h2>
      <div className="grid lg:grid-cols-7 md:grid-cols-6 grid-cols-3 gap-4 rounded-md">
        {chars
          .slice(0, 14)
          .sort(() => Math.random() - 0.5)
          .map((d) => (
            <CharacterList d={d} key={d.id} />
          ))}
      </div>
      <div className="block text-center my-4 border-t-4 border-double border-t-white pt-4">
        <Link
          href={"/genshin-impact/character"}
          className="font-semibold font-nova-square text-white"
        >
          {/* {message.characterSeeMore} &gt;&gt; */}
        </Link>
      </div>
    </div>
  );
}

function SkeletonDefault() {
  const array = Array.from({ length: 16 });

  return (
    <div className="p-4">
      <div className="w-full">
        <div className="bg-slate-900 animate-pulse h-8 w-[250px] mx-auto rounded-xl"></div>
      </div>
      <div className="grid lg:grid-cols-7 md:grid-cols-6 grid-cols-3 gap-4 rounded-md">
        {array.map((_d, i: number) => (
          <div
            key={`skeleton-${i}`}
            className="relative flex flex-col justify-center items-center animate-pulse my-4 bg-slate-900 rounded-lg p-4"
          >
            <div className="w-[115px] h-[130px] bg-slate-800 mb-2 animate-pulse rounded-xl "></div>
            <div className="bg-slate-800 w-[100px] h-[40px] mt-2 animate-pulse rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
