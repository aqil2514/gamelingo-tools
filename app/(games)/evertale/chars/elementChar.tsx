"use client";

import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { createContext, useContext, useEffect, useState } from "react";
import "./scrollbar.css";

const ElementContext = createContext<React.ComponentState | null>(null);
export default function ElementChar() {
  const [element, setElement] = useState<React.ComponentState>({ fire: [], water: [], light: [], dark: [], storm: [], earth: [] });
  const [loading, setLoading] = useState<Boolean>(false);

  async function getElement() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/gamelingo/evertale?category=chars&element=all");

      console.log(data);

      if (data.status !== 200) {
        alert(data.msg);
        return;
      }
      setElement(data.elementChar);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getElement();
  }, []);
  return loading ? (
    <></>
  ) : (
    <div className={DIV_MAIN_STYLE + " bg-zinc-700"}>
      <ElementContext.Provider value={{ element }}>
        <FireElement />
        <WaterElement />
        <DarkElement />
        <LightElement />
        <EarthElement />
        <StormElement />
      </ElementContext.Provider>
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

function FireElement() {
  const { element } = useContext(ElementContext) as React.ComponentState;
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Fire Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.fire.map((char: ElementState) => (
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

function WaterElement() {
  const { element } = useContext(ElementContext) as React.ComponentState;
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Water Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.water.map((char: ElementState) => (
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

function DarkElement() {
  const { element } = useContext(ElementContext) as React.ComponentState;
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Dark Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.dark.map((char: ElementState) => (
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

function LightElement() {
  const { element } = useContext(ElementContext) as React.ComponentState;
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Light Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.light.map((char: ElementState) => (
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

function EarthElement() {
  const { element } = useContext(ElementContext) as React.ComponentState;
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Earth Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.earth.map((char: ElementState) => (
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

function StormElement() {
  const { element } = useContext(ElementContext) as React.ComponentState;
  return (
    <div className={MAIN_CONTAINER_STYLE}>
      <h1 className={TITLE_STYLE}>Storm Element</h1>
      <div className={INNER_CONTAINER_STYLE + " scrollbar-style"}>
        {element.storm.map((char: ElementState) => (
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
