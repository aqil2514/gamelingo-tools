import { CharacterProfile } from "@/models/Evertale/Characters";
import React, { RefObject, useState } from "react";

const OptionLanguage = ({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: React.ComponentState }) => {
  return (
    <div className="w-full mx-auto">
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 1 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="mode-1">
        <input className="hidden" onChange={() => setActiveIndex(1)} value={"cp-mode1"} type="radio" name="language" id="mode-1" />
        EN | ID
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 2 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="mode-2">
        <input className="hidden" onChange={() => setActiveIndex(2)} value={"cp-mode2"} type="radio" name="language" id="mode-2" />
        EN
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 3 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="mode-3">
        <input className="hidden" onChange={() => setActiveIndex(3)} value={"cp-mode3"} type="radio" name="language" id="mode-3" />
        ID
      </label>
    </div>
  );
};

const Article = ({ charProfile, part1, part2, part3, activeIndex }: { charProfile: CharacterProfile; part1: RefObject<HTMLElement>; part2: RefObject<HTMLElement>; part3: RefObject<HTMLElement>; activeIndex: number | null }) => {
  if (activeIndex === 1)
    return (
      <div>
        <article key="part1" ref={part1}>
          <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 1</h3>
          <p className="text-white italic font-poppins">{charProfile.part1En}</p>
          <div className="bg-white w-full h-1 my-4"></div>
          <p className="text-white font-poppins">{charProfile.part1Id}</p>
        </article>
        {charProfile.part2Id && charProfile.part2En && (
          <article key="part2" style={{ display: "none" }} ref={part2}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 2</h3>
            <p className="text-white italic font-poppins">{charProfile.part2En}</p>
            <div className="bg-white w-full h-1 my-4"></div>
            <p className="text-white font-poppins">{charProfile.part2Id}</p>
          </article>
        )}
        {charProfile.part3Id && charProfile.part3En && (
          <article key="part3" style={{ display: "none" }} ref={part3}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 3</h3>
            <p className="text-white italic font-poppins">{charProfile.part3En}</p>
            <div className="bg-white w-full h-1 my-4"></div>
            <p className="text-white font-poppins">{charProfile.part3Id}</p>
          </article>
        )}
      </div>
    );
  else if (activeIndex === 2)
    return (
      <div>
        <article key="part1" ref={part1}>
          <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 1</h3>
          <p className="text-white italic font-poppins">{charProfile.part1En}</p>
        </article>
        {charProfile.part2Id && charProfile.part2En && (
          <article key="part2" style={{ display: "none" }} ref={part2}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 2</h3>
            <p className="text-white italic font-poppins">{charProfile.part2En}</p>
          </article>
        )}
        {charProfile.part3Id && charProfile.part3En && (
          <article key="part3" style={{ display: "none" }} ref={part3}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 3</h3>
            <p className="text-white italic font-poppins">{charProfile.part3En}</p>
          </article>
        )}
      </div>
    );
  else if (activeIndex === 3)
    return (
      <div>
        <article key="part1" ref={part1}>
          <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 1</h3>
          <p className="text-white italic font-poppins">{charProfile.part1Id}</p>
        </article>
        {charProfile.part2Id && charProfile.part2En && (
          <article key="part2" style={{ display: "none" }} ref={part2}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 2</h3>
            <p className="text-white italic font-poppins">{charProfile.part2Id}</p>
          </article>
        )}
        {charProfile.part3Id && charProfile.part3En && (
          <article key="part3" style={{ display: "none" }} ref={part3}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 3</h3>
            <p className="text-white italic font-poppins">{charProfile.part3Id}</p>
          </article>
        )}
      </div>
    );
};

export default function CharProfile({ charProfile, part1, part2, part3 }: { charProfile: CharacterProfile; part1: RefObject<HTMLElement>; part2: RefObject<HTMLElement>; part3: RefObject<HTMLElement> }) {
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <div className="w-full md:w1/2 mt-8 lg:ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
      <OptionLanguage activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <Article charProfile={charProfile} part1={part1} part2={part2} part3={part3} activeIndex={activeIndex} />
    </div>
  );
}
