"use client";

import { MigrationContextProps, MigrationParams } from "./helper";
import React, { createContext, useContext, useState } from "react";
import SelectData from "./SelectData";
import FetchData from "./FetchData";

const MigrationContext = createContext<MigrationContextProps>(
  {} as MigrationContextProps
);

export default function MigrationComponent() {
  const [param, setParam] = useState<MigrationParams>({} as MigrationParams);
  const [topicData, setTopicData] = useState<
    Components.Input.SelectProps<any>["data"]
  >([]);
  const [topic, setTopic] = useState<string>("");

  return (
    <MigrationContext.Provider
      value={{ param, setParam, topic, setTopic, topicData, setTopicData }}
    >
      <div className="w-1/2 py-12 mx-auto">
        <SelectData />

        <FetchData />
      </div>
    </MigrationContext.Provider>
  );
}

export function useMigrationContext() {
  return useContext(MigrationContext);
}
