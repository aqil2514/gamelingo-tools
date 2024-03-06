import React, { createContext, useContext, useState } from "react";

export interface PreviewLinksState {
  link1: string;
  link2: string;
  link3: string;
  link4: string;
  link5: string;
  link6: string;
}

interface ConstellationsContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  moveLocation: boolean;
  setMoveLocation: React.Dispatch<React.SetStateAction<boolean>>;
  constellation: GenshinImpact.ApiResponseConstellations;
  setConstellation: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseConstellations>>;
  previewLinks: PreviewLinksState;
  setPreviewLinks: React.Dispatch<React.SetStateAction<PreviewLinksState>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

const ConstellationsContext = createContext<ConstellationsContextState>({} as ConstellationsContextState);

export default function ConstellationsProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moveLocation, setMoveLocation] = useState<boolean>(true);
  const [constellation, setConstellation] = useState<GenshinImpact.ApiResponseConstellations>({} as GenshinImpact.ApiResponseConstellations);
  const [previewLinks, setPreviewLinks] = React.useState<PreviewLinksState>({} as PreviewLinksState);
  const [fileName, setFileName] = React.useState<string>("");

  return <ConstellationsContext.Provider value={{ isLoading, setIsLoading, moveLocation, setMoveLocation, setConstellation, constellation, previewLinks, setPreviewLinks, fileName, setFileName }}>{children}</ConstellationsContext.Provider>;
}

export const useConstellationsContext = () => {
  return useContext(ConstellationsContext);
};
