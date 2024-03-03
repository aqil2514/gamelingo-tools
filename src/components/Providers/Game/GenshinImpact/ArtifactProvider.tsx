import React, { createContext, useContext, useState } from "react";

interface ArtifactContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  moveLocation: boolean;
  setMoveLocation: React.Dispatch<React.SetStateAction<boolean>>;
  artifact: GenshinImpact.ApiResponseArtifacts;
  setArtifact: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseArtifacts>>;
}

const ArtifactContext = createContext<ArtifactContextState>({} as ArtifactContextState);

export default function ArtifactProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moveLocation, setMoveLocation] = useState<boolean>(true);
  const [artifact, setArtifact] = useState<GenshinImpact.ApiResponseArtifacts>({} as GenshinImpact.ApiResponseArtifacts);

  return <ArtifactContext.Provider value={{ isLoading, setIsLoading, moveLocation, setMoveLocation, setArtifact, artifact }}>{children}</ArtifactContext.Provider>;
}

export const useArtifactContext = () => {
  return useContext(ArtifactContext);
};
