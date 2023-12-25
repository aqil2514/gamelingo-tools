import { CharacterProfile } from "@/models/Evertale/Characters";
import { RefObject } from "react";

export default function CharProfile({ charProfile, part1, part2, part3 }: { charProfile: CharacterProfile; part1: RefObject<HTMLElement>; part2: RefObject<HTMLElement>; part3: RefObject<HTMLElement> }) {
  return (
    <div className="w-full md:w1/2 mt-8 lg:ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
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
}
