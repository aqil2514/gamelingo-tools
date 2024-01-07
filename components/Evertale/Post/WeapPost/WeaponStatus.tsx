import { Icon } from "@iconify/react";
import React from "react";

export default function WeaponStatus({ weapAscend, weapMax }: any) {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const [status, setStatus] = React.useState("no-ascend");

  return (
    <div className="w-full md:w1/2 mt-8 ml-2 px-4 py-4 rounded-xl bg-slate-800  overflow-y-scroll scrollbar-style">
      <OptionStatus status={status} setStatus={setStatus} />
      {status === "no-ascend" && <Weapon data={weapAscend.noAscend} regex={regex} title="No Ascend Status" />}
      {status === "ascend-1" && <Weapon data={weapAscend.ascend1} regex={regex} title="Ascend 1 Status" />}
      {status === "full-ascend" && <Weapon data={weapAscend.fullAscend} regex={regex} title="Ascend 1 Status" />}
      {status === "max-status" && <Weapon data={weapMax} skill={weapAscend.fullAscend.weapSkill} regex={regex} title="Max Status" isMaxed />}
    </div>
  );
}

const OptionStatus = ({ status, setStatus }: { status: string; setStatus: React.ComponentState }) => {
  return (
    <div className="my-2">
      <Option status={status} setStatus={setStatus} value="no-ascend" title="No Ascend" />
      <Option status={status} setStatus={setStatus} value="ascend-1" title="Ascend 1" />
      <Option status={status} setStatus={setStatus} value="full-ascend" title="Full Ascend" />
      <Option status={status} setStatus={setStatus} value="max-status" title="Max Status" />
    </div>
  );
};

const Option = ({ status, setStatus, value, title }: { status: string; setStatus: React.ComponentState; value: string; title: string }) => {
  return (
    <label
      className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-[11px] md:text-base lg:text-xl text-white transition-all cursor-pointer ${status === value && " bg-white !text-slate-800 !cursor-default"}`}
      htmlFor={`status-${value}`}
    >
      <input className="hidden" onChange={(e) => setStatus(e.target.value)} value={value} type="radio" name="language" id={`status-${value}`} />
      {title}
    </label>
  );
};

const Weapon = ({ data, regex, title, skill, isMaxed = false }: any) => {
  return (
    <>
      <h1 className="text-white font-merriweather font-extrabold text-lg md:text-xl lg:text-2xl text-center">{title}</h1>
      <fieldset disabled className="border-2 px-4 py-2 my-4 w-full lg:w-1/2 mx-auto rounded-xl">
        <legend className="font-poppins text-center text-base text-white">Weapon Skill</legend>
        <p className="font-poppins text-center text-base mb-2 text-white">{isMaxed ? skill.skillEn : data.weapSkill.skillEn}</p>
        <div className="bg-white w-full h-[2px]"></div>
        <p className="font-poppins text-center text-base mt-2 text-white">{isMaxed ? skill.skillId : data.weapSkill.skillId}</p>
      </fieldset>
      <div className="grid grid-cols-3">
        <div className="flex flex-row my-2 justify-start hover:text-orange-500 text-white" title="Power">
          <Icon icon="game-icons:punch-blast" className="w-[32px] h-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]" />
          <p className="my-auto ml-2 text-lg md:text-2xl lg:text-5xl font-poppins font-bold">{data.status.power.toString().replace(regex, ",")}</p>
        </div>
        <div className="flex flex-row my-2 justify-center hover:text-rose-500 text-white" title="Attack">
          <Icon icon="game-icons:pointy-sword" className="w-[32px] h-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]" />
          <p className="my-auto ml-2 text-lg md:text-2xl lg:text-5xl font-poppins font-bold">{data.status.atk.toString().replace(regex, ",")}</p>
        </div>
        <div className="flex flex-row my-2 justify-end hover:text-green-500 text-white" title="HP">
          <Icon icon="game-icons:healing-shield" className="w-[32px] h-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]" />
          <p className="my-auto ml-2 text-lg md:text-2xl lg:text-5xl font-poppins font-bold">{data.status.hp.toString().replace(regex, ",")}</p>
        </div>
        {!isMaxed && (
          <div className="flex flex-row my-2 justify-start hover:text-slate-500 text-white" title="Cost">
            <Icon icon="game-icons:abstract-047" className="w-[32px] h-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]" />
            <p className="my-auto ml-2 text-lg md:text-2xl lg:text-5xl font-poppins font-bold">{data.status.cost.toString().replace(regex, ",")}</p>
          </div>
        )}
        <div className={`flex flex-row my-2 ${isMaxed ? "justify-start" : "justify-center"}  hover:text-purple-500 text-white`} title="Level">
          <Icon icon="game-icons:level-four" className="w-[32px] h-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]" />
          <p className="my-auto ml-2 text-lg md:text-2xl lg:text-5xl font-poppins font-bold">{data.status.level.toString().replace(regex, ",")}</p>
        </div>
        <div className={`flex flex-row my-2 ${isMaxed ? "justify-center" : "justify-end"} hover:text-yellow-500 text-white`} title="Boost">
          <Icon icon="game-icons:power-lightning" className="w-[32px] h-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]" />
          <p className="my-auto ml-2 text-lg md:text-2xl lg:text-5xl font-poppins font-bold">{data.status.boost.toString().replace(regex, ",")}</p>
        </div>
        <div className={`flex flex-row my-2 ${isMaxed ? "justify-end" : "justify-start"} hover:text-amber-300 text-white`} title="Potential">
          <Icon icon="game-icons:crystal-shine" className="w-[32px] h-[32px] md:h-[48px] md:w-[48px] lg:h-[64px] lg:w-[64px]" />
          <p className="my-auto ml-2 text-lg md:text-2xl lg:text-5xl font-poppins font-bold">{data.status.potential.toString().replace(regex, ",")}%</p>
        </div>
      </div>
    </>
  );
};
