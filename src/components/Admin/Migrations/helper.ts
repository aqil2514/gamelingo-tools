import React from "react";

/** Local Interface */
export interface MigrationParams extends Record<string, string> {
  category: General.AdminQuery["field"];
  topic: any;
}

export interface MigrationContextProps {
  param: MigrationParams;
  setParam: React.Dispatch<React.SetStateAction<MigrationParams>>;
  topicData: Components.Input.SelectProps<any>["data"];
  setTopicData: React.Dispatch<
    React.SetStateAction<Components.Input.SelectProps<any>["data"]>
  >;
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
}

/** Type Guard */
export const migrationTypeGuard = {
  evertaleTopic: (topic: any): topic is General.GameEvertale["category"] => {
    return topic;
  },
  genshinTopic: (
    topic: any
  ): topic is General.GameGenshinImpact["category"] => {
    return topic;
  },
};

/** Local Data */
export const optionData: Components.Input.SelectProps<
  General.AdminQuery["field"]
>["data"] = [
  {
    value: "genshin-impact",
    label: "Genshin Impact",
  },
  {
    value: "evertale",
    label: "Evertale",
  },
];

const evertaleTopic: Components.Input.SelectProps<
  General.GameEvertale["category"]
>["data"] = [
  {
    value: "Accessory",
    label: "Accessory",
  },
  {
    value: "Weapon",
    label: "Weapon",
  },
  {
    value: "Character",
    label: "Character",
  },
];

const genshinTopic: Components.Input.SelectProps<
  General.GameGenshinImpact["category"]
>["data"] = [
  {
    value: "Artifact",
    label: "Artifact",
  },
  {
    value: "Character",
    label: "Character",
  },
  {
    value: "Constellations",
    label: "Constellations",
  },
  {
    value: "Material",
    label: "Material",
  },
  {
    value: "Talent",
    label: "Talent",
  },
  {
    value: "Weapon",
    label: "Weapon",
  },
];

/** Local Functions */
export function getTopic(game: General.AdminQuery["field"]) {
  if (game === "account") throw new Error("Ini bukan game");

  if (game === "evertale" && migrationTypeGuard.evertaleTopic(game))
    return evertaleTopic;
  else if (game === "genshin-impact" && migrationTypeGuard.genshinTopic(game))
    return genshinTopic;
}
