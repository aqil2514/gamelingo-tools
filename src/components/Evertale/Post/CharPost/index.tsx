import { DIV_MAIN_STYLE } from "@/components/Styles";
import { useRef } from "react";
import Title from "./Title";
import CharStatus from "./CharStatus";
import CharProfile from "./CharProfile";
import CharImage from "./CharImage";
import CharIntro from "./CharIntro";
import CharActiveSkill from "./CharActiveSkill";
import CharPassiveSkill from "./CharPassiveSkill";

const CharPost = ({ data }: { data: Evertale.Character.State }) => {
  const part1 = useRef(null);
  const part2 = useRef(null);
  const part3 = useRef(null);

  return (
    <div className={DIV_MAIN_STYLE + " px-2 lg:px-8"}>
      <Title title={data.charStatus.charName} />

      <div className="flex my-4 flex-col md:flex-row justify-between content-center">
        <CharImage charImage={data.charImage} charName={data.charStatus.charName} part1={part1} part2={part2} part3={part3} />

        <CharProfile charProfile={data.charProfile} part1={part1} part2={part2} part3={part3} />
      </div>

      <CharStatus charStatus={data.charStatus} />

      <p className="mt-4 text-white font-bold text text-xs h-0 font-merriweather">Click or touch the div to visible or hide the navigation</p>
      {data.charIntro && Object.keys(data.charIntro).length >= 2 && <CharIntro charIntro={data.charIntro} />}

      <div className="flex mb-4 flex-col md:flex-row justify-between content-center">
        <CharActiveSkill charActiveSkill={data.charActiveSkill} />
        <CharPassiveSkill charPassiveSkill={data.charPassiveSkill} />
      </div>

      <div className="text-white font-bold font-nova-square text-2xl">Related Article : </div>
    </div>
  );
};

export default CharPost;
