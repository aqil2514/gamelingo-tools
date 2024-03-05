import React, { createContext, useContext, useState } from "react";

interface CharacterContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  moveLocation: boolean;
  setMoveLocation: React.Dispatch<React.SetStateAction<boolean>>;
  character: GenshinImpact.ApiResponseCharacter;
  setCharacter: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseCharacter>>;
  previewLink: string;
  setPreviewLink: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

const CharacterContext = createContext<CharacterContextState>({} as CharacterContextState);

export default function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moveLocation, setMoveLocation] = useState<boolean>(true);
  const [character, setCharacter] = useState<GenshinImpact.ApiResponseCharacter>({} as GenshinImpact.ApiResponseCharacter);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");

  return <CharacterContext.Provider value={{ isLoading, setIsLoading, moveLocation, setMoveLocation, setCharacter, character, previewLink, setPreviewLink, fileName, setFileName }}>{children}</CharacterContext.Provider>;
}

export const useCharacterContext = () => {
  return useContext(CharacterContext);
};
