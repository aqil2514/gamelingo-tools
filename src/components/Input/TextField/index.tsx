import React from "react";
import TextFieldProvider, { useTextFieldContext } from "./TextFieldProvider";

type InputProps = Components.Input.InputProps<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };

export enum VariantClass {
  dashboard = "block w-full py-2 rounded-lg px-2 text-zinc-950 text-base font-bold font-poppins my-2",
}

export default function TextField({ variant, forId, label, ...props }: InputProps) {
  if (!variant) variant = "default-variant-1";
  // if(variant === "default-variant-1") return <DefaultInput forId={forId} label={label} />
  return <TextFieldProvider forId={forId} label={label} variant={variant} {...props}>
      {variant === "default-variant-1" && <DefaultInput/> }
    </TextFieldProvider>
}

function DefaultInput() {
  const {props} = useTextFieldContext();
  const {forId, label} = props;
  return (
    <label htmlFor={forId} className={`text-white text-base font-bold font-poppins`}>
      {label} :
      <input type="text" id={forId} className="block w-full py-2 rounded-lg px-2 text-zinc-950 text-base font-bold font-poppins my-2" {...props} />
    </label>
  );
}
