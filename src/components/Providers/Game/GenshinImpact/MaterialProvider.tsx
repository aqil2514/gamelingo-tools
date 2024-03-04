import React, { createContext, useContext, useState } from "react";

interface MaterialContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  moveLocation: boolean;
  setMoveLocation: React.Dispatch<React.SetStateAction<boolean>>;
  material: GenshinImpact.ApiResponseMaterial;
  setMaterial: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseMaterial>>;
  previewLink: string;
  setPreviewLink: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

const MaterialContext = createContext<MaterialContextState>({} as MaterialContextState);

export default function MaterialProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moveLocation, setMoveLocation] = useState<boolean>(true);
  const [material, setMaterial] = useState<GenshinImpact.ApiResponseMaterial>({} as GenshinImpact.ApiResponseMaterial);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");

  return <MaterialContext.Provider value={{ isLoading, setIsLoading, moveLocation, setMoveLocation, setMaterial, material, previewLink, setPreviewLink, fileName, setFileName }}>{children}</MaterialContext.Provider>;
}

export const useMaterialContext = () => {
  return useContext(MaterialContext);
};
