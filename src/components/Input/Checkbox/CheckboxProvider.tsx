import React, { createContext, useContext } from "react";

interface CheckboxContextProps {
  props: Components.Input.InputProps<HTMLInputElement>;
}
const CheckboxContext = createContext<CheckboxContextProps>({} as CheckboxContextProps);

interface CheckboxProviderProps extends Components.Input.InputProps<HTMLInputElement> {
  children: React.ReactNode;
}

export default function CheckboxProvider({ children, ...props }: CheckboxProviderProps) {
  return <CheckboxContext.Provider value={{ props: { ...props } as Components.Input.InputProps<HTMLInputElement> }}>{children}</CheckboxContext.Provider>;
}

export function useCheckboxContext() {
  return useContext(CheckboxContext);
}
