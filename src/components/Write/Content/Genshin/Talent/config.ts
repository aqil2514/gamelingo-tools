import React from "react";

export interface CombatStatus {
  statsName: string;
  paramName: string[];
  additionalRule: string;
  suffix: string;
  codeStatus: string;
}

export function useTableConfig(label: string[][]) {
  const mainConfig = React.useMemo(() => {
    const result: CombatStatus[] = [];

    label?.forEach((combat1) => {
      const paramNameMatch = combat1[1].match(/\{(\w+):[A-Z0-9]+\}/g);
      const paramName = paramNameMatch
        ? paramNameMatch?.map((match) => match.substring(1, match.indexOf(":")))
        : [];

      const additionalRuleMatch = !combat1[1].includes("F2") && !combat1[1].includes("F1") ? combat1[1].match(/[\+/]/g) : null;
      const additionalRule = additionalRuleMatch
        ? additionalRuleMatch.join("")
        : "";

      const codeStatus = combat1[1].toString().split(":")[1].split("}")[0];

      const suffix = !combat1[1].endsWith("}")
        ? combat1[1].split("}")[1].trim()
        : "";
      result.push({
        statsName: combat1[0],
        paramName,
        additionalRule,
        suffix,
        codeStatus,
      });
    });

    return result;
  }, [label]);

  return mainConfig;
}

interface CombatStatusInfo {
  basicStatus: string;
  additionalStatus: string;
  isSuffix: string;
  suffix: string;
  isAdditional: string;
}

export function tableMappingConfig({
  status,
  num,
  talent,
  i
}: {
  status: CombatStatus;
  num: number;
  talent: GenshinImpact.ApiResponseTalent;
  i:number;
}): CombatStatusInfo {
  const basicStatus =
    status.codeStatus === "F1" || status.codeStatus === "I" || status.codeStatus === "F2"
      ? num.toString()
      : (num * 100).toFixed(2) + "%";

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

  return {
    basicStatus,
    additionalStatus,
    isAdditional,
    isSuffix,
    suffix,
  };
}

