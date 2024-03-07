import React, { createContext, useContext, useState } from "react";

interface TalentContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  moveLocation: boolean;
  setMoveLocation: React.Dispatch<React.SetStateAction<boolean>>;
  talent: GenshinImpact.ApiResponseTalent;
  setTalent: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseTalent>>;
  previewLink: string;
  setPreviewLink: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

const TalentContext = createContext<TalentContextState>({} as TalentContextState);

export default function TalentProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moveLocation, setMoveLocation] = useState<boolean>(true);
  const [talent, setTalent] = useState<GenshinImpact.ApiResponseTalent>({} as GenshinImpact.ApiResponseTalent);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");

  return <TalentContext.Provider value={{ isLoading, setIsLoading, moveLocation, setMoveLocation, setTalent, talent, previewLink, setPreviewLink, fileName, setFileName }}>{children}</TalentContext.Provider>;
}

export const useTalentContext = () => {
  return useContext(TalentContext);
};
