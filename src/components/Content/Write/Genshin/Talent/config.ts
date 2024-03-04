import React from "react";

// INTERACE DATA START

export interface CombatStatus {
  statsName: string;
  paramName: string[];
  additionalRule: string;
  suffix: string[];
  codeStatus: string;
}

interface CombatStatusInfo {
  basicStatus: string;
  isSuffix: boolean;
  suffix: string[];
  isAdditional: string;
  isAnyParam: boolean;
}

interface BasicStateTypes {
  default: (num: number) => string;
  f1p: (num: number) => string;
  p: (num: number) => string;
  f1: (num: number) => string;
  f2: (num: number) => string;
  f2p: (num: number) => string;
  i: (num: number) => string;
}
// INTERACE DATA END

// LOCAL UTILS START

const basicStats: BasicStateTypes = {
  default: (num) => {
    return (num * 100).toFixed(2) + "%";
  },
  f1p: (num) => {
    return (num * 100).toFixed(2) + "%";
  },
  p: (num) => {
    return (num * 100).toFixed(2) + "%";
  },
  f1: (num) => {
    return num.toString();
  },
  f2: (num) => {
    return num.toFixed(2);
  },
  f2p: (num) => {
    return (num * 100).toFixed(2) + "%";
  },
  i: (num) => {
    return num.toString();
  },
};

// LOCAL UTILS START

// FUNCTIONS EXPORT START

export function tableMappingConfig({
  status,
  num,
  talent,
  i,
}: {
  status: CombatStatus;
  num: number;
  talent: GenshinImpact.ApiResponseTalent;
  i: number;
}): CombatStatusInfo {
  const codeStatus: keyof BasicStateTypes = Object.keys(basicStats).includes(
    status.codeStatus.toLowerCase()
  )
    ? (status.codeStatus.toLowerCase() as keyof BasicStateTypes)
    : "default";
  const basicStatus = basicStats[codeStatus](num);

  const isSuffix = status.suffix.length !== 0;
  const suffix = status.suffix;

  const procBasicAdditionalStatus =
    talent?.combat2?.attributes?.parameters[status.paramName[1]];
  let basicAdditionalStatus;
  if (procBasicAdditionalStatus) {
    basicAdditionalStatus = procBasicAdditionalStatus?.map(
      (num) => `${(num * 100).toFixed(2)}%`
    );
  }

  const isAdditional = status.additionalRule;
  const isAnyParam =
    status.paramName.length === 2 &&
    status.paramName[0] !== status.paramName[1];

  // const additionalStatus = isAnyParam
  //   ? `${basicStatus} ${status.additionalRule} ${
  //       basicAdditionalStatus && basicAdditionalStatus[i]
  //     }`
  //   : `${basicStatus} ${status.additionalRule} ${basicStatus}`;

  return {
    basicStatus,
    isAdditional,
    isAnyParam,
    isSuffix,
    suffix,
  };
}

export function useTableConfig(label: string[][]) {
  const mainConfig = React.useMemo(() => {
    const result: CombatStatus[] = [];

    label?.forEach((combat1) => {
      const paramNameMatch = combat1[1].match(/\{(\w+):[A-Z0-9]+\}/g); // Hapus semua simbol yang tidak diperlukan
      const paramName = paramNameMatch
        ? paramNameMatch?.map((match) => match.substring(1, match.indexOf(":")))
        : [];

      const additionalRuleMatch =
        !combat1[1].includes("F2") &&
        (!combat1[1].includes("F1") || combat1[1].includes("F1P"))
          ? combat1[1].match(/[\+/]/g)
          : null;
      const additionalRule = additionalRuleMatch
        ? additionalRuleMatch.join("")
        : "";

      const codeStatus = combat1[1].toString().split(":")[1].split("}")[0];

      const suffix = !combat1[1].endsWith("}")
        ? combat1[1]
            .split("+")
            .map((y) => y.substring(y.indexOf("}") + 1).trim())
        : [];

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

// FUNCTIONS EXPORT END