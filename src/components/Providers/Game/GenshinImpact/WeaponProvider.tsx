import React, { createContext, useContext, useState } from "react";

interface WeaponContextState {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  moveLocation: boolean;
  setMoveLocation: React.Dispatch<React.SetStateAction<boolean>>;
  weapon: GenshinImpact.ApiResponseWeapon;
  setWeapon: React.Dispatch<React.SetStateAction<GenshinImpact.ApiResponseWeapon>>;
  previewLink: string;
  setPreviewLink: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

const WeaponContext = createContext<WeaponContextState>({} as WeaponContextState);

export default function WeaponProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moveLocation, setMoveLocation] = useState<boolean>(true);
  const [weapon, setWeapon] = useState<GenshinImpact.ApiResponseWeapon>({} as GenshinImpact.ApiResponseWeapon);
  const [previewLink, setPreviewLink] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");

  return <WeaponContext.Provider value={{ isLoading, setIsLoading, moveLocation, setMoveLocation, setWeapon, weapon, previewLink, setPreviewLink, fileName, setFileName }}>{children}</WeaponContext.Provider>;
}

export const useWeaponContext = () => {
  return useContext(WeaponContext);
};
