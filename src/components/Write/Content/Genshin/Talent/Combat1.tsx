import { useMemo } from "react";

// TODO: COMEBACK HERE AFTER MASTERING REGEX

export default function Combat1({
  talent,
  combat1Label,
}: {
  talent: GenshinImpact.ApiResponseTalent;
  combat1Label: string[][];
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
          {combat1Label?.map((label) => {
            const labelParam = label[1].split(":")[0].replace("{", "");
            const number = talent?.combat1?.attributes?.parameters[labelParam];

            return (
              <tr key={label[0]}>
                <td className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800">
                  <p className="text-white font-bold font-poppins p-4">
                    {label[0]}
                  </p>
                </td>
                <NumCombatMap number={number} combat1Label={combat1Label} />
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
  combat1Label,
}: {
  number: number[];
  combat1Label: string[][];
}) {
  const status = useMemo(() => {
    const result = [] as any;

    combat1Label.forEach((combat1) => {
      const paramNameMatch = combat1[1].match(/\{(\w+):[A-Z0-9]+\}/g);
      const paramName = paramNameMatch
        ? paramNameMatch?.map((match) => match.substring(1, match.indexOf(":")))
        : [];
      
        const additionalRuleMatch = combat1[1].match(/[\+/]/g);
      const additionalRule = additionalRuleMatch
        ? additionalRuleMatch.join("")
        : "";

      const statusScallingMatches= combat1[1].match(/}\{(.*?)\}([^}]+)$/); 
      const statusScalling = statusScallingMatches ? statusScallingMatches[2].trim() : ""; ;
      result.push({
        statsName: combat1[0],
        paramName,
        additionalRule,
        statusScalling,
      });
    });

    return result;
  }, [combat1Label]);

  function clickHandler(e: React.MouseEvent<HTMLTableCellElement>) {
    const parentElement = e.currentTarget.parentElement as HTMLTableCellElement;
    const children = Array.from(parentElement.children);

    console.log(status);
  }

  // children.forEach((child) => {
  //   const table = child as HTMLTableCellElement;
  //   const pElement = table.firstElementChild as HTMLParagraphElement;
  //   if (pElement.innerText.endsWith("%")) {
  //     pElement.innerText = pElement.innerText + " Max HP";
  //   }
  // });
  return (
    <>
      {number.map((num: number, i: number) => {
        return (
          <td
            key={num}
            onClick={clickHandler}
            className="bg-slate-700 hover:bg-slate-600 hover:cursor-pointer border border-slate-800"
          >
            <p className="text-white font-bold font-poppins p-4 ">
              {(num * 100).toFixed(2) + "%"}
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
