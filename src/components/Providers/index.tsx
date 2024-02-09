import React, { useReducer } from "react";
import {
  GIMaterialState,
  GIMaterialStateAction,
  GI_MATERIAL_INITIAL_STATE,
  giMaterialReducer,
} from "./reducer";

interface GenshinMaterialContextState {
  state: GIMaterialState;
  dispatch: React.Dispatch<GIMaterialStateAction>;
}

const GenshinMaterialContext = React.createContext<GenshinMaterialContextState>(
  {} as GenshinMaterialContextState
);

export function GenshinMaterialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(
    giMaterialReducer,
    GI_MATERIAL_INITIAL_STATE
  );
  return (
    <GenshinMaterialContext.Provider value={{ state, dispatch }}>
      {children}
    </GenshinMaterialContext.Provider>
  );
}

export function useGIMaterialData() {
  return React.useContext(GenshinMaterialContext);
}
