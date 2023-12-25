"use client";

import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import Image from "next/image";
import Link from "next/link";
import "./scrollbar.css";
import useSWR from "swr";
import { SWRError, SWRLoading } from "@/app/components/SWR";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function ElementChar() {
  const URL = "/api/gamelingo/evertale/chars?category=element";
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) return <SWRLoading />;
  if (error) return <SWRError />;

  return (
    <div className={DIV_MAIN_STYLE + " bg-zinc-700"}>
      <FireElement element={data.elementChar.fire} />
      <WaterElement element={data.elementChar.water} />
      <DarkElement element={data.elementChar.dark} />
      <LightElement element={data.elementChar.light} />
      <EarthElement element={data.elementChar.earth} />
      <StormElement element={data.elementChar.storm} />
    </div>
  );
}

type ElementState = {
  id: string;
  charName: string;
  image: string;
};

const MAIN_CONTAINER_STYLE = "px-0";
const TITLE_STYLE = "text-base lg:text-2xl text-start font-bold font-merienda text-white mt-4";
const INNER_CONTAINER_STYLE = "flex flex-row justify-start overflow-x-scroll flex-nowrap w-full";
const FIGURE_STYLE = "mx-4 my-4 flex flex-col justify-between content-between bg-slate-800 min-w-[240px] max-w-[240px] min-h-[350px] px-4 py-4 rounded-xl";
const FIGCAPTION_STYLE = "text-white font-poppins text-center text-sm mt-4";
const BUTTON_STYLE = "block mx-auto px-2 py-2 bg-lime-700 rounded-xl text-white font-poppins text-sm";
const IMAGE_STYLE = "rounded-xl h-[312px] object-cover";

function FireElement({ element }: { element: ElementState[] }) {
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Fire Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.map((char: ElementState) => (
          <figure key={char?.id} className={FIGURE_STYLE}>
            <Image src={char?.image} width={240} height={240} alt={char?.charName} className={IMAGE_STYLE} />
            <figcaption className={FIGCAPTION_STYLE}>{char?.charName}</figcaption>
            <Link href={`/evertale/chars/${char?.id}`} className="my-4">
              <button className={BUTTON_STYLE}>Lihat Character</button>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
}

function WaterElement({ element }: { element: ElementState[] }) {
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Water Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.map((char: ElementState) => (
          <figure key={char?.id} className={FIGURE_STYLE}>
            <Image src={char?.image} width={240} height={240} alt={char?.charName} className={IMAGE_STYLE} />
            <figcaption className={FIGCAPTION_STYLE}>{char?.charName}</figcaption>
            <Link href={`/evertale/chars/${char?.id}`} className="my-4">
              <button className={BUTTON_STYLE}>Lihat Character</button>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
}

function DarkElement({ element }: { element: ElementState[] }) {
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Dark Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.map((char: ElementState) => (
          <figure key={char?.id} className={FIGURE_STYLE}>
            <Image src={char?.image} width={240} height={240} alt={char?.charName} className={IMAGE_STYLE} />
            <figcaption className={FIGCAPTION_STYLE}>{char?.charName}</figcaption>
            <Link href={`/evertale/chars/${char?.id}`} className="my-4">
              <button className={BUTTON_STYLE}>Lihat Character</button>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
}

function LightElement({ element }: { element: ElementState[] }) {
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Light Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.map((char: ElementState) => (
          <figure key={char?.id} className={FIGURE_STYLE}>
            <Image src={char?.image} width={240} height={240} alt={char?.charName} className={IMAGE_STYLE} />
            <figcaption className={FIGCAPTION_STYLE}>{char?.charName}</figcaption>
            <Link href={`/evertale/chars/${char?.id}`} className="my-4">
              <button className={BUTTON_STYLE}>Lihat Character</button>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
}

function EarthElement({ element }: { element: ElementState[] }) {
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Earth Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.map((char: ElementState) => (
          <figure key={char?.id} className={FIGURE_STYLE}>
            <Image src={char?.image} width={240} height={240} alt={char?.charName} className={IMAGE_STYLE} />
            <figcaption className={FIGCAPTION_STYLE}>{char?.charName}</figcaption>
            <Link href={`/evertale/chars/${char?.id}`} className="my-4">
              <button className={BUTTON_STYLE}>Lihat Character</button>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
}

function StormElement({ element }: { element: ElementState[] }) {
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Storm Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.map((char: ElementState) => (
          <figure key={char?.id} className={FIGURE_STYLE}>
            <Image src={char?.image} width={240} height={240} alt={char?.charName} className={IMAGE_STYLE} />
            <figcaption className={FIGCAPTION_STYLE}>{char?.charName}</figcaption>
            <Link href={`/evertale/chars/${char?.id}`} className="my-4">
              <button className={BUTTON_STYLE}>Lihat Character</button>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
}
