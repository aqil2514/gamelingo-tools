"use client";

import { DIV_MAIN_STYLE } from "@/app/components/Styles";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import CharImage from "./Component/CharImage";
import CharProfile from "./Component/CharProfile";
import Title from "./Component/Title";
import CharStatus from "./Component/CharStatus";
import CharIntro from "./Component/CharIntro";
import CharActiveSkill from "./Component/CharActiveSkill";
import CharPassiveSkill from "./Component/CharPassiveSkill";

export default function Data({ char }: { char: any }) {
  const part1 = useRef(null);
  const part2 = useRef(null);
  const part3 = useRef(null);

  return (
    <div className={DIV_MAIN_STYLE + " px-2 lg:px-8"}>
      <Title title={char.charStatus.charName} />

      <div className="flex my-4 flex-col md:flex-row justify-between content-center">
        <CharImage charImage={char.charImage} charName={char.charStatus.charName} part1={part1} part2={part2} part3={part3} />

        <CharProfile charProfile={char.charProfile} part1={part1} part2={part2} part3={part3} />
      </div>

      <CharStatus charStatus={char.charStatus} />

      {Object.keys(char.charIntro).length >= 2 && <CharIntro charIntro={char.charIntro} />}

      <p className="mt-4 text-white font-bold text text-xs h-0 font-merriweather">Click or touch the div to visible or hide the navigation</p>
      <div className="flex mb-4 flex-col md:flex-row justify-between content-center">
        <CharActiveSkill charActiveSkill={char.charActiveSkill} />
        <CharPassiveSkill charPassiveSkill={char.charPassiveSkill} />
      </div>
    </div>
  );
}
