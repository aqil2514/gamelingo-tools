import { Option } from "@/components/general/Option";
import { Icon } from "@iconify/react";
import React from "react";
import { QuestionOctagon, QuestionOctagonFill } from "react-bootstrap-icons";

export default function WeaponStatus({ weapAscend, weapMax }: { weapAscend: Evertale.Weapon.Ascend; weapMax: Evertale.Weapon.WeapMax }) {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const [status, setStatus] = React.useState("no-ascend");
  const [isActived, setIsActived] = React.useState(false);
  const objectRef = React.useRef(null);

  if (!weapAscend.noAscend || !weapAscend.ascend1 || !weapAscend.fullAscend || !weapMax || !weapAscend.fullAscend.weapSkill) throw new Error("Data tidak ada");

  return (
    <div className="w-full md:w1/2 mt-8 ml-2 px-4 py-4 rounded-xl bg-slate-800  overflow-y-scroll scrollbar-style">
      <OptionStatus status={status} setStatus={setStatus} />
      <Questions isActived={isActived} setIsActived={setIsActived} objectRef={objectRef} />
      {status === "no-ascend" && <Weapon data={weapAscend.noAscend} regex={regex} title="No Ascend Status" />}
      {status === "ascend-1" && <Weapon data={weapAscend.ascend1} regex={regex} title="Ascend 1 Status" />}
      {status === "full-ascend" && <Weapon data={weapAscend.fullAscend} regex={regex} title="Full Ascend Status" />}
      {status === "max-status" && <Weapon data={weapMax} skill={weapAscend.fullAscend.weapSkill} regex={regex} title="Max Status" isMaxed />}
    </div>
  );
}

const OptionStatus = ({ status, setStatus }: { status: string; setStatus: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <>
      <div className="my-2 hidden md:block">
        <Option status={status} setStatus={setStatus} name="status" value="no-ascend" title="No Ascend" />
        <Option status={status} setStatus={setStatus} name="status" value="ascend-1" title="Ascend 1" />
        <Option status={status} setStatus={setStatus} name="status" value="full-ascend" title="Full Ascend" />
        <Option status={status} setStatus={setStatus} name="status" value="max-status" title="Max Status" />
      </div>
      <div className="my-2 block md:hidden">
        <div className="my-2 text-center">
          <Option status={status} setStatus={setStatus} name="status" value="no-ascend" title="No Ascend" />
          <Option status={status} setStatus={setStatus} name="status" value="ascend-1" title="Ascend 1" />
        </div>
        <div className="my-2 text-center">
          <Option status={status} setStatus={setStatus} name="status" value="full-ascend" title="Full Ascend" />
          <Option status={status} setStatus={setStatus} name="status" value="max-status" title="Max Status" />
        </div>
      </div>
    </>
  );
};

// const Option = ({ status, setStatus, value, title }: { status: string; setStatus: React.ComponentState; value: string; title: string }) => {
//   return (
//     <label
//       className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-[11px] md:text-base lg:text-xl text-white transition-all cursor-pointer ${status === value && " bg-white !text-slate-800 !cursor-default"}`}
//       htmlFor={`status-${value}`}
//     >
//       <input className="hidden" onChange={(e) => setStatus(e.target.value)} value={value} type="radio" name="language" id={`status-${value}`} />
//       {title}
//     </label>
//   );
// };

interface WeaponTypes {
  data: Evertale.Weapon.NoAscend | Evertale.Weapon.Ascend1 | Evertale.Weapon.FullAscend | Evertale.Weapon.WeapMax;
  regex: RegExp;
  title: string;
  skill?: Evertale.Weapon.Skill;
  isMaxed?: boolean;
}

const Weapon = ({ data, regex, title, skill, isMaxed = false }: WeaponTypes) => {
  return (
    <>
      <h1 className="text-white font-merriweather font-extrabold text-lg md:text-xl lg:text-2xl text-center">{title}</h1>
      <fieldset disabled className="border-2 px-4 py-2 my-4 w-full lg:w-1/2 mx-auto rounded-xl">
        <legend className="font-poppins text-center text-base text-white">Weapon Skill</legend>
        <p className="font-poppins text-center text-base mb-2 text-white">{isMaxed ? skill?.skillEn : (data as any).weapSkill.skillEn}</p>
        <div className="bg-white w-full h-[2px]"></div>
        <p className="font-poppins text-center text-base mt-2 text-white">{isMaxed ? skill?.skillId : (data as any).weapSkill.skillId}</p>
      </fieldset>
      <div className="grid grid-cols-3">
        <IconElement hoverText="hover:text-orange-500" justify="start" title="Power" iconName="game-icons:punch-blast" iconValue={data?.status?.power?.toString().replace(regex, ",")} />
        <IconElement hoverText="hover:text-rose-500" justify="center" title="Attack" iconName="game-icons:pointy-sword" iconValue={data?.status?.atk?.toString().replace(regex, ",")} />
        <IconElement hoverText="hover:text-green-500" justify="end" title="HP" iconName="game-icons:healing-shield" iconValue={data?.status?.hp?.toString().replace(regex, ",")} />
        {!isMaxed && <IconElement hoverText="hover:text-slate-500" justify="start" title="Cost" iconName="game-icons:abstract-047" iconValue={data?.status?.cost?.toString().replace(regex, ",")} />}
        <IconElement hoverText="hover:text-purple-500" justify={isMaxed ? "start" : "center"} title="Level" iconName="game-icons:level-four" iconValue={data?.status?.level?.toString().replace(regex, ",")} />
        <IconElement hoverText="hover:text-yellow-500" justify={isMaxed ? "center" : "end"} title="Boost" iconName="game-icons:power-lightning" iconValue={data?.status?.boost?.toString().replace(regex, ",")} />
        <IconElement hoverText="hover:text-amber-300" justify={isMaxed ? "end" : "start"} title="Potential" iconName="game-icons:crystal-shine" iconValue={data?.status?.potential?.toString().replace(regex, ",") + "%"} />
      </div>
    </>
  );
};

const Questions = ({ isActived, setIsActived, objectRef }: { isActived: boolean; setIsActived: React.ComponentState; objectRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <div className="m-4" ref={objectRef}>
      {isActived ? <QuestionOctagonFill className="text-white text-2xl lg:text-4xl" onClick={() => setIsActived(false)} /> : <QuestionOctagon className="text-white text-2xl lg:text-4xl" onClick={() => setIsActived(true)} />}
      {isActived && (
        <div className="grid grid-cols-3 border-2 border-white rounded-xl p-2 mt-4">
          <IconElement hoverText="hover:text-orange-500" title="Power" iconName="game-icons:punch-blast" />
          <IconElement hoverText="hover:text-rose-500" title="Attack" iconName="game-icons:pointy-sword" />
          <IconElement hoverText="hover:text-green-500" title="HP" iconName="game-icons:healing-shield" />
          <IconElement hoverText="hover:text-slate-500" title="Cost" iconName="game-icons:abstract-047" />
          <IconElement hoverText="hover:text-purple-500" title="Level" iconName="game-icons:level-four" />
          <IconElement hoverText="hover:text-yellow-500" title="Boost" iconName="game-icons:power-lightning" />
          <IconElement hoverText="hover:text-amber-300" title="Pot" iconName="game-icons:crystal-shine" />
        </div>
      )}
    </div>
  );
};

const IconElement = ({ hoverText, title, iconName, iconValue, justify }: { hoverText: string; title: string; iconName: string; iconValue?: any; justify?: string }) => {
  return (
    <div className={`flex flex-row my-2 ${justify ? `justify-${justify}` : ""} text-white ${hoverText}`} title={title}>
      <Icon icon={iconName} className="w-[32px] h-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]" />
      <p className="my-auto ml-2 text-lg md:text-2xl lg:text-5xl font-poppins font-bold cursor-default">{iconValue ? iconValue : title}</p>
    </div>
  );
};
