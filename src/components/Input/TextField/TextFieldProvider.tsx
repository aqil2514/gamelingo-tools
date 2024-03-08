import React, { createContext, useContext } from "react";

interface TextFieldContextProps {
  props: Components.Input.InputProps<HTMLInputElement>;
}
const TextFieldContext = createContext<TextFieldContextProps>({} as TextFieldContextProps);

interface TextFieldProviderProps extends Components.Input.InputProps<HTMLInputElement>{
  children: React.ReactNode
}

export default function TextFieldProvider({ children, ...props }: TextFieldProviderProps) {
  return <TextFieldContext.Provider value={{ props: {...props} as Components.Input.InputProps<HTMLInputElement> }}>{children}</TextFieldContext.Provider>;
}

export function useTextFieldContext() {
  return useContext(TextFieldContext);
}
