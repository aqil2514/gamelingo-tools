import { useMemo } from "react";
import { CombatStatus } from ".";

// TODO: COMEBACK HERE AFTER MASTERING REGEX

export default function Combat1({
  talent,
  combat1Label,
  status,
}: {
  talent: GenshinImpact.ApiResponseTalent;
  combat1Label: string[][];
  status: CombatStatus[];
}) {
  return (
    <div className="h-64 rounded px-4 overflow-scroll">
      <table>
        <thead>
          <tr className="text-white font-bold font-poppins p-4 text-center">
            <td className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">
              Nama Skill
            </td>
            {talent?.combat1?.attributes?.parameters?.param1.map((value, i) => (
              <td
                key={value}
                className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800"
              >
                Level {i + 1}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="max-w-[200px] text-center">
          {status?.map((stat) => {
            const param =
              talent?.combat1?.attributes?.parameters[stat.paramName[0]];
            const additionalParam =
              talent?.combat1?.attributes?.parameters[stat.paramName[1]];

            return (
              <tr key={stat.statsName}>
                <td className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">
                  <p className="text-white font-bold font-poppins p-4">
                    {stat.statsName}
                  </p>
                </td>
                <NumCombatMap number={param} status={stat} talent={talent} />
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
}: {
  number: number[];
  status: CombatStatus;
  talent: GenshinImpact.ApiResponseTalent;
}) {
  function clickHandler(e: React.MouseEvent<HTMLTableCellElement>) {
    const parentElement = e.currentTarget.parentElement as HTMLTableCellElement;
    const children = Array.from(parentElement.children);
  }

  return (
    <>
      {number?.map((num: number, i: number) => {
        const basicStatus = status.codeStatus === "F1" ? num : (num * 100).toFixed(2) + "%";
        const procBasicAdditionalStatus =
          talent?.combat1?.attributes?.parameters[status.paramName[1]];
        let basicAdditionalStatus;
        if (procBasicAdditionalStatus) {
          basicAdditionalStatus = procBasicAdditionalStatus?.map(
            (num) => (num * 100).toFixed(2) + "%"
          );
        }

        const isAdditional = status.additionalRule;
        const isAnyParam =
          status.paramName.length === 2 &&
          status.paramName[0] !== status.paramName[1];

        const additionalStatus = isAnyParam
          ? `${basicStatus} ${status.additionalRule} ${
              basicAdditionalStatus && basicAdditionalStatus[i]
            }`
          : `${basicStatus} ${status.additionalRule} ${basicStatus}`;

        const isSuffix = status.suffix;
        const suffix = status.suffix;

        return (
          <td
            key={num}
            onClick={clickHandler}
            className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800"
          >
            <p className="text-white font-bold font-poppins p-4 ">
              {(isAdditional ? additionalStatus : basicStatus) +
                (isSuffix ? ` ${suffix}` : "")}
            </p>
          </td>
        );
      })}
    </>
  );
}

function PopUpMenu({
  options,
  x,
  y,
}: {
  options: string[];
  x: number;
  y: number;
}) {
  return (
    <ul style={{ position: "absolute", top: y, left: x }}>
      {options.map((option, i) => (
        <li key={i}>{option}</li>
      ))}
    </ul>
  );
}
