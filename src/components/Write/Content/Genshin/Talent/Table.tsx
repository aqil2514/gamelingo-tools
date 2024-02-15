import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import React from "react";
import { CombatStatus, tableMappingConfig, useTableConfig } from "./config";

export default function TableMapping({
  talent,
  setTalent,
  index,
}: {
  talent: GenshinImpact.ApiResponseTalent;
  setTalent: React.Dispatch<
    React.SetStateAction<GenshinImpact.ApiResponseTalent>
  >;
  index: "combat1" | "combat2" | "combat3" | "combatsp";
}) {
  const label = React.useMemo(() => {
    const labels = talent[index]?.attributes?.labels;
    const mapLabels = labels?.map((label) => label.split("|"));

    return mapLabels;
  }, [talent, index]);

  const config = useTableConfig(label);

  const title = {
    combat1: "Combat 1 (Normal Attack)",
    combat2: "Combat 2 (Elemental Skill)",
    combat3: "Combat 3 (Elemental Burst)",
    combatsp: "Sprint",
  };

  return (
    <>
      <h2 className="text-white font-semibold font-poppins">{title[index]}</h2>

      <Input
        forId="talent-combat-1-name"
        label="Talent Name"
        variant={VariantClass.dashboard}
        onChange={(e) =>
          setTalent({
            ...talent,
            [index]: { ...talent[index], name: e.target.value },
          })
        }
        value={talent[index]?.name}
      />

      <Textarea
        forId="talent-combat-1-info"
        label="Talent Info"
        className={TextareaStyle.variant_1}
        onChange={(e) =>
          setTalent({
            ...talent,
            [index]: { ...talent[index], description: e.target.value },
          })
        }
        value={talent[index]?.description}
      />

      {label && label?.length !== 0 && (
        <CombatMapping talent={talent} config={config} index={index} />
      )}
    </>
  );
}

function CombatMapping({
  talent,
  config,
  index,
}: {
  talent: GenshinImpact.ApiResponseTalent;
  config: CombatStatus[];
  index: "combat1" | "combat2" | "combat3" | "combatsp";
}) {
  return (
    <div className={`h-64 rounded px-4 overflow-scroll`}>
      <table>
        <thead>
          <tr className="text-white font-bold font-poppins p-4 text-center">
            <td className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">
              Nama Skill
            </td>
            {talent[index]?.attributes?.parameters?.param1.map((value, i) => (
              <td
                key={value}
                className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800"
              >
                {index === "combatsp" ? "Info" : `Level ${i + 1}`}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="max-w-[200px] text-center">
          {config?.map((stat) => {
            const param =
              talent[index]?.attributes?.parameters[stat.paramName[0]];

            return (
              <tr key={stat.statsName}>
                <td className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">
                  <p className="text-white font-bold font-poppins p-4">
                    {stat.statsName}
                  </p>
                </td>
                <NumCombatMap number={param} status={stat} talent={talent} index={index} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function NumCombatMap({
  number,
  status,
  talent,
  index
}: {
  number: number[];
  status: CombatStatus;
  talent: GenshinImpact.ApiResponseTalent;
  index: "combat1" | "combat2" | "combat3" | "combatsp";
}) {
  return (
    <>
      {number?.map((num: number, i: number) => {
        const { basicStatus, isAdditional, isAnyParam,isSuffix, suffix } =
          tableMappingConfig({
            status,
            num,
            talent,
            i,
          });
        
          // TODO : FIX BAGIAN SEPERTI KASUS XIANYUN
        return (
          <td
            key={num}
            className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800"
          >
            <p className="text-white font-bold font-poppins p-4 ">
              {`${basicStatus} ${isSuffix ? suffix[0] : ""}`}
              {isAdditional ? <SecondMapping status={status} talent={talent} combat={index} i={i} /> :""}
            </p>
          </td>
        );
      })}
    </>
  );
}

function SecondMapping({status, talent, combat,i} : {status:CombatStatus, talent:GenshinImpact.ApiResponseTalent, combat: "combat1" | "combat2" | "combat3" | "combatsp", i:number}){
  const params = talent[combat]?.attributes.parameters[status.paramName[1]]
  return <>{`${status.additionalRule} ${(params[i] * 100).toFixed(2)}% ${status.suffix[1] ? status.suffix[1] : ''}`}</>
}